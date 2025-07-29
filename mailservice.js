import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// ✅ Define transporter at the top-level scope
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ sentmail expects plain options: { firstName, lastName, email, phone, message }
export async function sentmail(options) {
  try {
    const { firstName, lastName, phone, email, message } = options;

    const fullname = `${firstName} ${lastName}`;

    // ✉️ Email to Customer
    const customerMail = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "FITNESS FOUR – We've Received Your Inquiry 💪",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #fff; padding: 30px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1e90ff; text-align: center;">Thank You for Reaching Out to FITNESS FOUR!</h2>
          <p style="font-size: 16px; color: #333;">
            Hi <strong>${fullname}</strong>,
          </p>
          <p style="font-size: 16px; color: #333;">
            We’ve received your message and our team will be in touch with you shortly. We’re excited that you're exploring a journey to better health and fitness with us.
          </p>
          <p style="font-size: 16px; color: #333;">
            <strong>FITNESS FOUR</strong> is more than a gym — it's a movement to bring premium, expert-driven fitness to every corner of the country.
          </p>
          <p style="font-size: 16px; color: #333;">
            Backed by 20+ years of industry experience through our parent company <strong>Fuel and Flex Pvt Ltd (Deshna Group)</strong>, we’re committed to helping you become a healthier, stronger version of yourself.
          </p>
          <br>
          <p style="font-size: 16px; color: #333;">
            Stay strong,<br>
            <strong>Team FITNESS FOUR</strong>
          </p>
          <hr style="margin-top: 30px;">
          <p style="text-align: center; font-size: 13px; color: #888;">&copy; 2025 FITNESS FOUR. All rights reserved.</p>
        </div>
      `,
    };

    // 📩 Email to Team
    const internalMail = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Inquiry – ${fullname}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #fff; padding: 20px; max-width: 600px; margin: auto;">
          <h3 style="color: #1e90ff;">New Contact Form Submission</h3>
          <ul style="line-height: 1.6;">
            <li><strong>Name:</strong> ${fullname}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Message:</strong> ${message || "N/A"}</li>
          </ul>
          <p>Please follow up with the lead as soon as possible.</p>
          <hr />
          <small>&copy; 2025 FITNESS FOUR | Internal Notification Only</small>
        </div>
      `,
    };

    await transporter.sendMail(customerMail);
    await transporter.sendMail(internalMail);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}
