import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { requestSchema, saveRequest, type StoredRequest } from "@/lib/requests";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  // Bots fill the hidden field; pretend success without saving.
  if (parsed.data.website) return NextResponse.json({ id: "HR-0" });

  const stored = await saveRequest(parsed.data);

  try {
    await notify(stored);
  } catch (err) {
    console.error("Could not send request email:", err);
  }

  return NextResponse.json({ id: stored.id });
}

async function notify(r: StoredRequest) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, REQUEST_NOTIFY_TO } = process.env;
  if (!SMTP_HOST || !REQUEST_NOTIFY_TO) return;

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  const items = r.items.length
    ? r.items.map((i) => `• ${i.name} (${i.category}) — ${i.size}, ${i.option} × ${i.quantity} ${i.unit ?? "pcs"}`).join("\n")
    : "No products selected";

  await transport.sendMail({
    from: SMTP_USER || REQUEST_NOTIFY_TO,
    to: REQUEST_NOTIFY_TO,
    replyTo: r.email,
    subject: `New quote request ${r.id} — ${r.company}`,
    text: [
      `Reference: ${r.id}`,
      `Name: ${r.name}`,
      `Hotel / company: ${r.company}`,
      `Email: ${r.email}`,
      `Phone: ${r.phone || "-"}`,
      `Country: ${r.country || "-"}`,
      `Rooms: ${r.rooms || "-"}`,
      `Custom branding: ${r.branding ? "Yes" : "No"}`,
      `Website language: ${(r.locale ?? "en").toUpperCase()}`,
      "",
      "Products:",
      items,
      "",
      "Message:",
      r.message || "-",
    ].join("\n"),
  });
}
