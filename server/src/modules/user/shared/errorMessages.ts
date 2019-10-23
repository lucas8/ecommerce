import { createError } from "apollo-errors";

export const userNotFoundError = createError("UserNotFoundError", {
  message: "User not found"
});

export const passwordNotLongEnough = createError("PasswordNotLongEnough", {
  message: "Password must be at least 3 characters"
});
