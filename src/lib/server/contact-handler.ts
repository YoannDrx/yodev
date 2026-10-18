import { randomUUID } from "node:crypto";
import { escapeHtml, validateContactRequest } from "../contact-request.ts";
import { createContactRateLimiter, type RateLimitResult } from "./contact-rate-limit.ts";

export const CONTACT_BODY_BYTES = 32_768;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
type ContactEvent = {
  event: "contact"; requestId: string; outcome: string; status: number; durationMs: number;
  providerStatus?: number; providerId?: string; product?: string;
};
type Dependencies = {
  env: NodeJS.ProcessEnv; fetcher?: typeof fetch;
  limit?: (request: Request, email: string) => Promise<RateLimitResult>;
  log?: (event: ContactEvent) => void;
  deliveryTimeoutMs?: number; bodyTimeoutMs?: number;
};

class BodyError extends Error {
  status: number;
  constructor(status: number) { super("INVALID_BODY"); this.status = status; }
}
async function readBody(request: Request, timeoutMs: number) {
  const length = request.headers.get("content-length");
  if (length && (!/^\d+$/.test(length) || Number(length) > CONTACT_BODY_BYTES)) throw new BodyError(413);
  if (!request.body) throw new BodyError(400);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  let timedOut = false;
  const timer = setTimeout(() => { timedOut = true; void reader.cancel().catch(() => {}); }, timeoutMs);
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (timedOut) throw new BodyError(408);
      if (done) break;
      bytes += value.byteLength;
      if (bytes > CONTACT_BODY_BYTES) { void reader.cancel().catch(() => {}); throw new BodyError(413); }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } finally { clearTimeout(timer); reader.releaseLock(); }
}
function allowedOrigin(request: Request, env: NodeJS.ProcessEnv) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Non-browser clients still face shared quotas and validation.
  const configured = [env.NEXT_PUBLIC_SITE_URL ?? "https://www.yodev.fr", env.VERCEL_URL ? `https://${env.VERCEL_URL}` : undefined];
  if (env.NODE_ENV !== "production") configured.push(new URL(request.url).origin);
  return configured.some(value => { try { return value && new URL(value).origin === origin; } catch { return false; } });
}

export function createContactHandler({ env, fetcher = fetch, limit = createContactRateLimiter(env, fetcher), log = event => {
  // Only this allowlisted event reaches logs. Never log the request, provider body or exception.
  if (event.status >= 500) console.error(JSON.stringify(event));
  else console.info(JSON.stringify(event));
}, deliveryTimeoutMs = 8_000, bodyTimeoutMs = 5_000 }: Dependencies) {
  return async function POST(request: Request) {
    const started = Date.now();
    const suppliedId = request.headers.get("x-contact-request-id");
    const requestId = suppliedId && uuid.test(suppliedId) ? suppliedId : randomUUID();
    function finish(status: number, code: string, details: Record<string, unknown> = {}, event: Partial<ContactEvent> = {}, retryAfter?: number) {
      log({ event: "contact", requestId, outcome: code, status, durationMs: Date.now() - started, ...event });
      return Response.json({ ok: status === 200, ...(status === 200 ? {} : { code }), requestId, ...details }, {
        status, headers: { "Cache-Control": "no-store", "X-Contact-Request-Id": requestId, ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}) },
      });
    }
    if (!allowedOrigin(request, env)) return finish(403, "ORIGIN_REJECTED");
    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return finish(415, "UNSUPPORTED_MEDIA_TYPE");
    if (suppliedId && !uuid.test(suppliedId)) return finish(400, "INVALID_REQUEST_ID");
    let payload: unknown;
    try { payload = await readBody(request, bodyTimeoutMs); }
    catch (error) { return finish(error instanceof BodyError ? error.status : 400, error instanceof BodyError && error.status === 413 ? "BODY_TOO_LARGE" : "INVALID_REQUEST"); }
    const result = validateContactRequest(payload);
    if (!result.success) return finish(400, result.code, { fields: result.fields });
    if (result.data.website) return finish(200, "honeypot");
    const { RESEND_API_KEY: apiKey, RESEND_FROM_EMAIL: from, CONTACT_EMAIL: to } = env;
    if (!apiKey || !from || !to) return finish(503, "CONTACT_NOT_CONFIGURED");
    const data = result.data;
    try {
      const quota = await limit(request, data.email);
      if (!quota.allowed) return finish(429, "RATE_LIMITED", {}, {}, quota.retryAfter);
    } catch { return finish(503, "CONTACT_UNAVAILABLE", {}, { outcome: "limiter_unavailable" }); }
    const labels = { product: "Création", improvement: "Amélioration", audit: "Audit" };
    const lines = [
      ["Nom", data.name], ["Email", data.email], ["Organisation", data.organization],
      ["Produit", data.product ? `Yodev ${data.product}` : "Prestation"],
      ["Besoin", data.product ? "Découverte du produit" : labels[data.projectType as keyof typeof labels]], ["Budget", data.budget], ["Langue", data.locale],
    ].filter(([, value]) => value);
    const html = lines.map(([label, value]) => `<p><strong>${label} :</strong> ${escapeHtml(value)}</p>`).join("") + `<p><strong>Message :</strong><br>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>`;
    try {
      const response = await fetcher("https://api.resend.com/emails", {
        method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `contact-${requestId}` },
        body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `[Yodev${data.product ? ` ${data.product}` : ""}] ${data.product ? "Demande d’accès" : labels[data.projectType as keyof typeof labels]} — ${data.name}`, html,
          text: lines.map(([label, value]) => `${label} : ${value}`).join("\n") + `\n\n${data.message}` }),
        signal: AbortSignal.timeout(deliveryTimeoutMs), cache: "no-store", redirect: "error",
      });
      if (!response.ok) {
        const outcome = [401, 403].includes(response.status) ? "provider_auth" : response.status === 429 ? "provider_quota" : "provider_error";
        return finish(502, "DELIVERY_FAILED", {}, { outcome, providerStatus: response.status });
      }
      const accepted: unknown = await response.json();
      const id = accepted && typeof accepted === "object" && "id" in accepted ? accepted.id : undefined;
      if (typeof id !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(id)) return finish(502, "DELIVERY_FAILED", {}, { outcome: "provider_invalid_response" });
      return finish(200, "accepted", {}, { providerId: id, providerStatus: response.status, product: data.product || "services" });
    } catch (error) {
      const timeout = error instanceof Error && ["TimeoutError", "AbortError"].includes(error.name);
      return finish(timeout ? 504 : 502, timeout ? "DELIVERY_TIMEOUT" : "DELIVERY_FAILED", {}, { outcome: timeout ? "provider_timeout" : "provider_network" });
    }
  };
}
