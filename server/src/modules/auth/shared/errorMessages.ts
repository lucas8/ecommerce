import { createError } from "apollo-errors";

export const userNotFoundError = createError("UserNotFoundError", {
  message: "That email is not in our system"
});

export const passwordNotLongEnough = createError("PasswordNotLongEnough", {
  message: "Password must be at least 3 characters"
});
