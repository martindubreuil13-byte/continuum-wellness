import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

type NewsletterRequestBody = {
  email?: unknown;
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

const subscriberWelcomeHtml = `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2f2a24; padding: 24px;">
  <h2 style="font-size: 22px; margin-bottom: 16px;">Welcome to the Continuum</h2>

  <p>Thank you for joining the Founding Circle of Continuum Wellness by Carol Ann Beasley.</p>

  <p>This project was created around a simple belief: wellness is not only about recovery, but about continuity, connection, and the environments that help people feel grounded again.</p>

  <p>As the vision evolves, you’ll occasionally receive selected updates, early invitations, and opportunities to experience the journey with us.</p>

  <p>We’re honored to have you with us.</p>

  <p style="margin-top: 24px;">— Continuum Wellness</p>
</div>`;

export async function POST(request: Request) {
  const fromEmail = process.env.FROM_EMAIL;
  const recipients = getRecipients();

  if (!process.env.RESEND_API_KEY || !fromEmail || recipients.length === 0) {
    console.error("Newsletter email configuration is incomplete.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as NewsletterRequestBody | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: recipients,
      subject: "New Continuum Wellness Subscription",
      text: `A new visitor subscribed through the Continuum Wellness website.\n\nEmail: ${email}`,
      html: `
        <div style="margin:0;padding:32px;background:#f5f0e8;font-family:Arial,sans-serif;color:#1a1610;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e7dccb;border-radius:8px;overflow:hidden;">
            <div style="padding:28px 32px;background:#0f0d0b;color:#f5f0e8;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#c9a96e;">Continuum Wellness</p>
              <h1 style="margin:0;font-family:Georgia,serif;font-weight:400;font-size:28px;line-height:1.25;">New Subscription</h1>
            </div>
            <div style="padding:32px;">
              <p style="margin:0 0 20px;font-size:16px;line-height:1.6;">A new visitor joined the Continuum Wellness list.</p>
              <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8b7351;">Email</p>
              <p style="margin:0;font-size:18px;line-height:1.5;">${escapeHtml(email)}</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Newsletter email failed.", error);
      return NextResponse.json({ error: "Unable to send email." }, { status: 502 });
    }

    try {
      const { error: autoReplyError } = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Welcome to the Continuum",
        html: subscriberWelcomeHtml,
      });

      if (autoReplyError) {
        console.error("Newsletter auto-reply failed.", autoReplyError);
      }
    } catch (autoReplyError) {
      console.error("Newsletter auto-reply request failed.", autoReplyError);
    }

    console.log("Newsletter email sent.", { email, recipients: recipients.length });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Newsletter email request failed.", error);
    return NextResponse.json({ error: "Unable to send email." }, { status: 500 });
  }
}
