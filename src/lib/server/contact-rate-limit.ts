import { createHmac } from "node:crypto";
import { isIP } from "node:net";

export const CONTACT_QUOTAS = [
  { name: "ip", limit: 5, seconds: 900 },
  { name: "email", limit: 3, seconds: 900 },
  { name: "hour", limit: 100, seconds: 3600 },
  { name: "day", limit: 500, seconds: 86400 },
] as const;

// One atomic script: no interleaving between the checks, increments and expirations.
// Denied requests do not extend the window. All keys share a Redis cluster hash tag.
export const CONTACT_LIMIT_SCRIPT = `
local retry = 0
for i, key in ipairs(KEYS) do
  if tonumber(redis.call('GET', key) or '0') >= tonumber(ARGV[(i-1)*2+1]) then
    local ttl = redis.call('TTL', key)
    if ttl < 1 then ttl = tonumber(ARGV[(i-1)*2+2]) end
    retry = math.max(retry, ttl)
  end
end
if retry > 0 then return {0, retry} end
for i, key in ipairs(KEYS) do
  local count = redis.call('INCR', key)
  if count == 1 then redis.call('EXPIRE', key, tonumber(ARGV[(i-1)*2+2])) end
end
return {1, 0}
`;
export type RateLimitResult = { allowed: boolean; retryAfter: number };

/**
 * Redis REST credentials. Explicit names win; the names injected by the Upstash integration of the Vercel Marketplace
 * are accepted so the token never has to be copied by hand. Never the read-only token: the limiter writes.
 */
export const CONTACT_REDIS_ALIASES = {
  url: ["CONTACT_REDIS_REST_URL", "UPSTASH_REDIS_REST_URL", "KV_REST_API_URL"],
  token: ["CONTACT_REDIS_REST_TOKEN", "UPSTASH_REDIS_REST_TOKEN", "KV_REST_API_TOKEN"],
} as const;
export function contactRedisConfig(env: NodeJS.ProcessEnv) {
  const pick = (names: readonly string[]) => names.map(name => env[name]?.trim()).find(Boolean);
  return { endpoint: pick(CONTACT_REDIS_ALIASES.url), token: pick(CONTACT_REDIS_ALIASES.token) };
}

export function contactClientIp(request: Request, env: NodeJS.ProcessEnv) {
  // Only trust a header replaced by our ingress. Never trust arbitrary forwarded headers.
  const header = env.VERCEL === "1" ? "x-vercel-forwarded-for" : env.CONTACT_TRUSTED_IP_HEADER;
  const value = header ? request.headers.get(header)?.trim() : undefined;
  if (!value || !isIP(value)) return "unknown";
  // URL normalizes equivalent IPv6 spellings, preventing textual quota bypasses.
  return isIP(value) === 6 ? new URL(`http://[${value}]`).hostname : value;
}

export function createContactRateLimiter(env: NodeJS.ProcessEnv, fetcher: typeof fetch = fetch) {
  return async (request: Request, email: string): Promise<RateLimitResult> => {
    const { endpoint, token } = contactRedisConfig(env);
    const secret = env.CONTACT_RATE_LIMIT_SECRET;
    if (!endpoint || !token || !secret || secret.length < 32) throw new Error("LIMITER_NOT_CONFIGURED");
    const url = new URL(endpoint);
    if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) throw new Error("INVALID_LIMITER_URL");
    const hash = (value: string) => createHmac("sha256", secret).update(value).digest("hex");
    // Separate environments even if accidentally pointed at the same Redis database.
    const namespace = env.VERCEL_ENV ?? env.NODE_ENV ?? "development";
    const prefix = `yodev:{contact-${hash(namespace).slice(0, 16)}}`;
    const identities = [hash(contactClientIp(request, env)), hash(email.toLowerCase()), "all", "all"];
    const keys = CONTACT_QUOTAS.map((quota, i) => `${prefix}:${quota.name}:${identities[i]}`);
    const response = await fetcher(url, {
      method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["EVAL", CONTACT_LIMIT_SCRIPT, keys.length, ...keys, ...CONTACT_QUOTAS.flatMap(q => [q.limit, q.seconds])]),
      signal: AbortSignal.timeout(2_000), cache: "no-store", redirect: "error",
    });
    if (!response.ok) throw new Error("LIMITER_UNAVAILABLE");
    const body: unknown = await response.json();
    const result = body && typeof body === "object" && "result" in body ? body.result : null;
    if (!Array.isArray(result) || result.length !== 2 || ![0, 1].includes(result[0]) || !Number.isInteger(result[1]) || result[1] < 0 || result[1] > 86400) {
      throw new Error("INVALID_LIMITER_RESPONSE");
    }
    return { allowed: result[0] === 1, retryAfter: Math.max(1, result[1]) };
  };
}
