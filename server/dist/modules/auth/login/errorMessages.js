"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_errors_1 = require("apollo-errors");
exports.invalidLogin = apollo_errors_1.createError("InvalidLogin", {
    message: "Your email or password was incorrect"
});
exports.confirmEmailError = apollo_errors_1.createError("ConfirmEmailError", {
    message: "Please confirm your email"
});
exports.forgotPasswordLockedError = apollo_errors_1.createError("ForgotPasswordLockedError", {
    message: "Your account is locked"
});
exports.incorrectTwoFactor = apollo_errors_1.createError("IncorrectTwoFactor", {
    message: "Incorrect two factor challenge"
});
//# sourceMappingURL=errorMessages.js.map