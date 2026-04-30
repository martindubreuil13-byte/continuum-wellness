import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!resendApiKey || !contactEmail) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  const resend = new Resend(resendApiKey);
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Continuum Wellness <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: contactEmail,
    replyTo: email,
    subject: "New Founding Circle membership request",
    text: `A new visitor requested a Founding Circle membership.\n\nEmail: ${email}`,
  });

  if (error) {
    return NextResponse.json({ error: "Unable to send email." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
