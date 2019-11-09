"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_1 = require("qrcode");
const applicationName = "Ecommerce";
exports.generateQRCode = (base32, email) => {
    return qrcode_1.toDataURL(`otpauth://totp/${applicationName}:${email}?secret=${base32}&issuer=${applicationName}`);
};
//# sourceMappingURL=generateQrCode.js.map