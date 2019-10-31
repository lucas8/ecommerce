import { createError } from "apollo-errors";

export const duplicateEmail = createError("DuplicateEmail", {
  message: "Email already taken"
});

export const emailNotLongEnough = createError("EmailNotLongEnough", {
  message: "Email must be at least 3 characters"
});

export const invalidEmail = createError("InvalidEmail", {
  message: "Email must be a valid email"
});

export const noTokenProvided = createError("NoTwoFactorToken", {
  message: "No two factor authentication token was provided"
});
