import { toDataURL } from "qrcode";

const applicationName = "Ecommerce";

export const generateQRCode = (base32: string, email: string) => {
  return toDataURL(
    `otpauth://totp/${applicationName}:${email}?secret=${base32}&issuer=${applicationName}`
  );
};
