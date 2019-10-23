import * as sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendEmail = (email: string, link: string) => {
  const msg = {
    to: email,
    from: "ecommerce@example.com",
    subject: "Forgot Password Email",
    html: `<a href="${link}">${link}</a>`
  };

  sgMail.send(msg);
};
