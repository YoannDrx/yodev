// Session-only receipt metadata. No draft, name, email or message is persisted.
const storageKey = "yodev-contact-receipt-v1";
const lifetimeMs = 23 * 60 * 60 * 1000; // Shorter than the provider's 24-hour window.
export async function contactSubmissionId(payload: unknown) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(payload)));
  const fingerprint = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "null");
    if (saved?.fingerprint === fingerprint && saved.expires > Date.now() && typeof saved.id === "string" && /^[0-9a-f-]{36}$/i.test(saved.id)) return saved.id as string;
  } catch { /* Storage may be disabled; the component keeps its in-memory receipt. */ }
  const id = crypto.randomUUID();
  try { sessionStorage.setItem(storageKey, JSON.stringify({ fingerprint, id, expires: Date.now() + lifetimeMs })); } catch { /* Optional storage. */ }
  return id;
}
export function clearContactReceipt() {
  try { sessionStorage.removeItem(storageKey); } catch { /* Optional storage. */ }
}
