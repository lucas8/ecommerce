import * as yup from "yup";
import {
  passwordNotLongEnough,
  invalidEmail,
  emailNotLongEnough
} from "./errorMessages";
import { sign } from "jsonwebtoken";

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail),
  password: yup
    .string()
    .min(3, passwordNotLongEnough)
    .max(255)
});

export interface SignupArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const createConfirmationEmail = async (userId: string) => {
  const id = sign({ userId }, process.env.EMAIL_TOKEN_SECRET!);

  return `${process.env.FRONTEND_URL}/user/confirm/${id}`;
};
