import { createError } from "apollo-errors";

export const invalidLogin = createError("InvalidLogin", {
  message: "Invalid login"
});

export const confirmEmailError = createError("ConfirmEmailError", {
  message: "Please confirm your email"
});

export const forgotPasswordLockedError = createError(
  "ForgotPasswordLockedError",
  {
    message: "Account is locked"
  }
);
