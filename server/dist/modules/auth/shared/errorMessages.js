"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_errors_1 = require("apollo-errors");
exports.userNotFoundError = apollo_errors_1.createError("UserNotFoundError", {
    message: "That email is not in our system"
});
exports.passwordNotLongEnough = apollo_errors_1.createError("PasswordNotLongEnough", {
    message: "Password must be at least 3 characters"
});
//# sourceMappingURL=errorMessages.js.map