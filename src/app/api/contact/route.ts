import { createContactHandler } from "@/lib/server/contact-handler";

export const runtime = "nodejs";
export const maxDuration = 20;
export const POST = createContactHandler({ env: process.env });
