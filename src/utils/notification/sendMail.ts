import nodemailer from "nodemailer";
import config from "../../config";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.GMAIL_USER,
    pass: config.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const response = await transport.sendMail({
      from: config.FROM_ADMIN_EMAIL,
      to,
      subject,
      html,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
