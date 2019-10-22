import * as yup from "yup";
import {
  passwordNotLongEnough,
  invalidEmail,
  emailNotLongEnough
} from "./errorMessages";

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
