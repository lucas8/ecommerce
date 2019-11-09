"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_errors_1 = require("apollo-errors");
exports.duplicateEmail = apollo_errors_1.createError("DuplicateEmail", {
    message: "Email already taken"
});
exports.emailNotLongEnough = apollo_errors_1.createError("EmailNotLongEnough", {
    message: "Email must be at least 3 characters"
});
exports.invalidEmail = apollo_errors_1.createError("InvalidEmail", {
    message: "Email must be a valid email"
});
exports.noTokenProvided = apollo_errors_1.createError("NoTwoFactorToken", {
    message: "No two factor authentication token was provided"
});
//# sourceMappingURL=errorMessages.js.map