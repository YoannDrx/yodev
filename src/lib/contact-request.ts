export const CONTACT_LIMITS = {
  name: 80,
  email: 160,
  organization: 120,
  message: 4_000,
  projectType: 60,
  budget: 80,
} as const;

const CONTACT_PROJECT_TYPES = new Set(["product", "improvement", "audit"]);
const CONTACT_BUDGETS = new Set([
  "",
  "under-5k",
  "5k-15k",
  "15k-30k",
  "30k-plus",
  "unknown",
]);

export type ContactRequest = {
  name: string;
  email: string;
  organization: string;
  message: string;
  projectType: string;
  budget: string;
  locale: "fr" | "en";
  website: string;
};

type ContactValidationResult =
  | { success: true; data: ContactRequest }
  | { success: false; code: "INVALID_REQUEST" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized.length <= maxLength ? normalized : null;
}

export function validateContactRequest(
  payload: unknown
): ContactValidationResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { success: false, code: "INVALID_REQUEST" };
  }

  const input = payload as Record<string, unknown>;
  const name = readString(input.name, CONTACT_LIMITS.name);
  const email = readString(input.email, CONTACT_LIMITS.email);
  const organization = readString(
    input.organization ?? "",
    CONTACT_LIMITS.organization
  );
  const message = readString(input.message, CONTACT_LIMITS.message);
  const projectType = readString(
    input.projectType ?? "",
    CONTACT_LIMITS.projectType
  );
  const budget = readString(input.budget ?? "", CONTACT_LIMITS.budget);
  const website = readString(input.website ?? "", 200);
  const locale = input.locale === "en" ? "en" : "fr";

  if (
    !name ||
    name.length < 2 ||
    !email ||
    !message ||
    message.length < 20 ||
    organization === null ||
    projectType === null ||
    !CONTACT_PROJECT_TYPES.has(projectType) ||
    budget === null ||
    !CONTACT_BUDGETS.has(budget) ||
    website === null ||
    !emailPattern.test(email)
  ) {
    return { success: false, code: "INVALID_REQUEST" };
  }

  return {
    success: true,
    data: {
      name,
      email,
      organization,
      message,
      projectType,
      budget,
      locale,
      website,
    },
  };
}

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character
  );
}
