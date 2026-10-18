export const CONTACT_LIMITS = {
  name: 80, email: 160, organization: 120, message: 4_000, projectType: 60, budget: 80,
} as const;
export const CONTACT_MESSAGE_MIN = 20;
export const CONTACT_CLIENT_TIMEOUT_MS = 18_000;
export const CONTACT_PRODUCTS = ["mail", "ads", "spend"] as const;
export type ContactProduct = "" | (typeof CONTACT_PRODUCTS)[number];
export type ContactRequest = {
  name: string; email: string; organization: string; message: string;
  projectType: string; budget: string; product: ContactProduct;
  locale: "fr" | "en"; website: string;
};
export type ContactValues = Omit<ContactRequest, "locale">;
export type ContactFieldErrors = Partial<Record<keyof ContactRequest, "required" | "invalid" | "too_short" | "too_long">>;
type ContactValidationResult =
  | { success: true; data: ContactRequest }
  | { success: false; code: "INVALID_REQUEST"; fields: ContactFieldErrors };
const projectTypes = new Set(["product", "improvement", "audit"]);
const budgets = new Set(["", "under-5k", "5k-15k", "15k-30k", "30k-plus", "unknown"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const singleLineControls = /[\r\n\u0000-\u001f\u007f]/;

export function validateContactRequest(payload: unknown): ContactValidationResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { success: false, code: "INVALID_REQUEST", fields: {} };
  }
  const input = payload as Record<string, unknown>;
  const fields: ContactFieldErrors = {};
  function read(field: keyof ContactRequest, limit: number, required = false) {
    const raw = input[field] ?? "";
    if (typeof raw !== "string") { fields[field] = "invalid"; return ""; }
    const value = raw.trim();
    if (required && !value) fields[field] = "required";
    else if (value.length > limit) fields[field] = "too_long";
    else if (field !== "message" && singleLineControls.test(value)) fields[field] = "invalid";
    return value;
  }
  const name = read("name", CONTACT_LIMITS.name, true);
  const email = read("email", CONTACT_LIMITS.email, true);
  const organization = read("organization", CONTACT_LIMITS.organization);
  const message = read("message", CONTACT_LIMITS.message, true);
  const projectType = read("projectType", CONTACT_LIMITS.projectType, true);
  const budget = read("budget", CONTACT_LIMITS.budget);
  const product = read("product", 20);
  const website = read("website", 200);
  const locale = input.locale ?? "fr";
  if (!fields.email && !emailPattern.test(email)) fields.email = "invalid";
  if (!fields.message && message.length < CONTACT_MESSAGE_MIN) fields.message = "too_short";
  if (!projectTypes.has(projectType)) fields.projectType = "invalid";
  if (!budgets.has(budget)) fields.budget = "invalid";
  if (product !== "" && !CONTACT_PRODUCTS.some(value => value === product)) fields.product = "invalid";
  if (locale !== "fr" && locale !== "en") fields.locale = "invalid";
  if (Object.keys(fields).length) return { success: false, code: "INVALID_REQUEST", fields };
  return { success: true, data: {
    name, email, organization, message, projectType, budget, product: product as ContactProduct,
    locale: locale as "fr" | "en", website,
  } };
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  })[character] ?? character);
}
