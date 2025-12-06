import nodemailer from "nodemailer";

// Check if SMTP is configured
const SMTP_CONFIGURED = !!(process.env.SMTP_USER && process.env.SMTP_PASS);

// Email configuration
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
};

const COMPANY_EMAIL = process.env.COMPANY_EMAIL || "info@prodlift.com";

// Create transporter only if SMTP is configured
const transporter = SMTP_CONFIGURED ? nodemailer.createTransport(EMAIL_CONFIG) : null;

if (!SMTP_CONFIGURED) {
  console.log("SMTP not configured - email notifications disabled. Set SMTP_USER and SMTP_PASS to enable email.");
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  productCode?: string;
}) {
  if (!transporter) {
    console.log("Email not sent (SMTP not configured):", {
      type: "contact",
      from: data.email,
      subject: data.subject,
    });
    return { success: true, skipped: true };
  }

  const mailOptions = {
    from: EMAIL_CONFIG.auth.user,
    to: COMPANY_EMAIL,
    replyTo: data.email,
    subject: `Nouvelle demande de contact: ${data.subject}`,
    html: `
      <h2>Nouvelle demande de contact</h2>
      <p><strong>Nom:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Téléphone:</strong> ${data.phone}</p>` : ""}
      ${data.company ? `<p><strong>Entreprise:</strong> ${data.company}</p>` : ""}
      ${data.productCode ? `<p><strong>Produit:</strong> ${data.productCode}</p>` : ""}
      <p><strong>Sujet:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}

export async function sendNewsletterEmail(email: string) {
  if (!transporter) {
    console.log("Email not sent (SMTP not configured):", {
      type: "newsletter",
      email: email,
    });
    return { success: true, skipped: true };
  }

  const mailOptions = {
    from: EMAIL_CONFIG.auth.user,
    to: COMPANY_EMAIL,
    subject: "Nouvelle inscription à la newsletter",
    html: `
      <h2>Nouvelle inscription à la newsletter</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p>Date: ${new Date().toLocaleString("fr-FR")}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}
