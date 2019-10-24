import * as yup from "yup";
import { invalidEmail, emailNotLongEnough } from "./errorMessages";
import { sign } from "jsonwebtoken";

export const signupSchema: yup.ObjectSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail),
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(255)
});

export const createConfirmationEmail = async (userId: string) => {
  const id: string = sign({ userId }, process.env.EMAIL_TOKEN_SECRET!);

  return `${process.env.FRONTEND_URL}/user/confirm/${id}`;
};
