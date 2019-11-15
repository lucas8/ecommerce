import { createError } from "apollo-errors";

export const postNotFound = createError("PostNotFound", {
  message: "Post not found!"
});

export const postAlreadyPurchased = createError("PostAlreadyPurchased", {
  message: "Post already purchased!"
});
