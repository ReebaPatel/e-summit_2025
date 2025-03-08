import nodemailer from "nodemailer";
import { NextResponse as res } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    // 1. Configure Nodemailer transporter:
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or your email service (e.g., SendGrid, Mailgun)
      auth: {
        user: process.env.GMAIL_USER, // Your email address (environment variable)
        pass: process.env.GMAIL_PASSWORD, // Your email password or app password (environment variable)
      },
    });

    // 2. Construct the email message:
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: data.to, // Recipient email address
      subject: data.subject,
      html: data.html, // Email body (can be HTML)
      // Optionally include text:
      text: data.text || "",
    };

    // 3. Send the email:
    const info = await transporter.sendMail(mailOptions);

    // console.log("Message sent: %s", info.messageId);
    return res.json(
      { success: true, messageId: info.messageId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return res.json({ success: false, error: error.message }, { status: 500 });
  }
}
