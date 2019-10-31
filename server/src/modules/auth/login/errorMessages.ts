import { createError } from "apollo-errors";

export const invalidLogin = createError("InvalidLogin", {
  message: "Your email or password was incorrect"
});

export const confirmEmailError = createError("ConfirmEmailError", {
  message: "Please confirm your email"
});

export const forgotPasswordLockedError = createError(
  "ForgotPasswordLockedError",
  {
    message: "Your account is locked"
  }
);

export const incorrectTwoFactor = createError("IncorrectTwoFactor", {
  message: "Incorrect two factor challenge"
});
