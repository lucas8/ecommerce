"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.sendEmail = (email, link) => {
    const msg = {
        to: email,
        from: "ecommerce@example.com",
        subject: "Forgot Password Email",
        html: `<a href="${link}">${link}</a>`
    };
    sgMail.send(msg);
};
//# sourceMappingURL=sendEmail.js.map