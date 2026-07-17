import { NextResponse } from "next/server";
import {
  escapeHtml,
  validateContactRequest,
} from "@/lib/contact-request";

export const runtime = "nodejs";

const resendEndpoint = "https://api.resend.com/emails";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "INVALID_REQUEST" },
      { status: 400 }
    );
  }

  const result = validateContactRequest(payload);

  if (!result.success) {
    return NextResponse.json(
      { ok: false, code: result.code },
      { status: 400 }
    );
  }

  // Honeypot: acknowledge bot submissions without sending or storing them.
  if (result.data.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      { ok: false, code: "CONTACT_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  const { name, email, organization, message, projectType, budget, locale } =
    result.data;
  const requestId = request.headers.get("x-contact-request-id");
  const subject = `[Yodev] ${projectType || "Nouveau projet"} — ${name}`;
  const lines = [
    `<strong>Nom :</strong> ${escapeHtml(name)}`,
    `<strong>Email :</strong> ${escapeHtml(email)}`,
    organization
      ? `<strong>Organisation :</strong> ${escapeHtml(organization)}`
      : null,
    projectType
      ? `<strong>Type :</strong> ${escapeHtml(projectType)}`
      : null,
    budget ? `<strong>Budget :</strong> ${escapeHtml(budget)}` : null,
    `<strong>Langue :</strong> ${escapeHtml(locale)}`,
    `<strong>Message :</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}`,
  ].filter(Boolean);

  try {
    const response = await fetch(resendEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(requestId && /^[a-f0-9-]{36}$/i.test(requestId)
          ? { "Idempotency-Key": `contact-${requestId}` }
          : {}),
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html: `<p>${lines.join("</p><p>")}</p>`,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, code: "DELIVERY_FAILED" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, code: "DELIVERY_FAILED" },
      { status: 502 }
    );
  }
}
