import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sentmail(options) {
  try {
    const { fullname, phone, email, date, time, place, message } = options.data;

    // ✉️ Email to Customer
    const customerMail = {
      from: process.env.GMAIL_USER,
      to: options.to,
      subject: "Briyani Boss - We’ve Received Your Request 🍽️",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #fff; padding: 30px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #d2691e; text-align: center;">Thank You for Contacting Briyani Boss!</h2>
          <p style="font-size: 16px; color: #333;">
            Hello <strong>${options.data.fullname}</strong>,
          </p>
          <p style="font-size: 16px; color: #333;">
            We’ve received your catering/booking request and our team will get in touch with you shortly.
          </p>
          <p style="font-size: 16px; color: #333;">
            Whether you're planning a small gathering or a grand feast, Briyani Boss is here to serve you the most authentic and delicious flavors, made with love and tradition. 🍛
          </p>
          <p style="font-size: 16px; color: #333;">
            Sit back and relax — we’ll take care of the food!
          </p>
          <br>
          <p style="font-size: 16px; color: #333;">
            Warm regards,<br>
            <strong>Briyani Boss Team</strong>
          </p>
          <hr style="margin-top: 30px;">
          <p style="text-align: center; font-size: 13px; color: #888;">&copy; 2025 Briyani Boss. All rights reserved.</p>
        </div>
      `,
    };

    // 📩 Email to Briyani Boss
    const internalMail = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // internal email address (set in .env)
      subject: `New Booking Request - ${options.data.fullname}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #fff; padding: 20px; max-width: 600px; margin: auto;">
          <h3 style="color: #b22222;">New Catering/Booking Request Received</h3>
          <ul style="line-height: 1.6;">
            <li><strong>Name:</strong> ${options.data.fullname}</li>
            <li><strong>Phone:</strong> ${options.data.phone}</li>
            <li><strong>Email:</strong> ${options.data.email}</li>
            <li><strong>Date:</strong> ${options.data.date}</li>
            <li><strong>Time:</strong> ${options.data.time}</li>
            <li><strong>Place:</strong> ${options.data.place}</li>
            <li><strong>Message:</strong> ${options.data.message || "N/A"}</li>
          </ul>
          <p>Please follow up with the customer to confirm details.</p>
          <hr />
          <small>&copy; 2025 Briyani Boss. Internal Notification Only.</small>
        </div>
      `,
    };

    await transporter.sendMail(customerMail); // to customer
    await transporter.sendMail(internalMail); // to Briyani Boss team
  } catch (err) {
    console.error("Error sending email:", err);
  }
}
