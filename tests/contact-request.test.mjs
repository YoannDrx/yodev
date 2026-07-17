import assert from "node:assert/strict";
import test from "node:test";
import {
  CONTACT_LIMITS,
  escapeHtml,
  validateContactRequest,
} from "../src/lib/contact-request.ts";

const validRequest = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  organization: "Analytical Engines",
  projectType: "product",
  budget: "unknown",
  message: "A sufficiently detailed product problem to evaluate safely.",
  locale: "en",
  website: "",
};

test("normalizes and accepts a complete request", () => {
  const result = validateContactRequest({
    ...validRequest,
    name: `  ${validRequest.name}  `,
  });

  assert.equal(result.success, true);
  if (result.success) assert.equal(result.data.name, validRequest.name);
});

test("rejects unknown project and budget values", () => {
  assert.equal(
    validateContactRequest({ ...validRequest, projectType: "other" }).success,
    false,
  );
  assert.equal(
    validateContactRequest({ ...validRequest, budget: "unlimited" }).success,
    false,
  );
});

test("rejects malformed and oversized fields", () => {
  assert.equal(
    validateContactRequest({ ...validRequest, email: "not-an-email" }).success,
    false,
  );
  assert.equal(
    validateContactRequest({
      ...validRequest,
      message: "x".repeat(CONTACT_LIMITS.message + 1),
    }).success,
    false,
  );
});

test("escapes user-controlled HTML before email delivery", () => {
  assert.equal(
    escapeHtml(`<script>alert("x") & 'y'</script>`),
    "&lt;script&gt;alert(&quot;x&quot;) &amp; &#039;y&#039;&lt;/script&gt;",
  );
});
