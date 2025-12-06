import nodemailer from "nodemailer";

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

const COMPANY_EMAIL = process.env.COMPANY_EMAIL || "info@fratellivismara.it";

// Create transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  productCode?: string;
}) {
  const mailOptions = {
    from: EMAIL_CONFIG.auth.user,
    to: COMPANY_EMAIL,
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
