import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function getRecipients() {
  return [process.env.CONTACT_EMAIL, process.env.CONTACT_CC]
    .flatMap((value) => value?.split(",") ?? [])
    .map((value) => value.trim())
    .filter(Boolean);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  const fromEmail = process.env.FROM_EMAIL;
  const recipients = getRecipients();

  if (!process.env.RESEND_API_KEY || !fromEmail || recipients.length === 0) {
    console.error("Contact email configuration is incomplete.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as ContactRequestBody | null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: recipients,
      replyTo: email,
      subject: `New Continuum Wellness Inquiry from ${name}`,
      text: `New Continuum Wellness Inquiry\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="margin:0;padding:32px;background:#f5f0e8;font-family:Arial,sans-serif;color:#1a1610;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7dccb;border-radius:8px;overflow:hidden;">
            <div style="padding:28px 32px;background:#0f0d0b;color:#f5f0e8;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#c9a96e;">Continuum Wellness</p>
              <h1 style="margin:0;font-family:Georgia,serif;font-weight:400;font-size:28px;line-height:1.25;">New Inquiry</h1>
            </div>
            <div style="padding:32px;">
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">A new message was submitted through the Continuum Wellness website.</p>
              <div style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #eadfce;">
                <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8b7351;">Name</p>
                <p style="margin:0;font-size:16px;line-height:1.5;">${escapeHtml(name)}</p>
              </div>
              <div style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #eadfce;">
                <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8b7351;">Email</p>
                <p style="margin:0;font-size:16px;line-height:1.5;">${escapeHtml(email)}</p>
              </div>
              <div>
                <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8b7351;">Message</p>
                <p style="margin:0;font-size:16px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Contact email failed.", error);
      return NextResponse.json({ error: "Unable to send email." }, { status: 502 });
    }

    console.log("Contact email sent.", { email, recipients: recipients.length });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email request failed.", error);
    return NextResponse.json({ error: "Unable to send email." }, { status: 500 });
  }
}
