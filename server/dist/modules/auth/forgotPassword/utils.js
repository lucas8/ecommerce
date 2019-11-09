"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const User_1 = require("../../../entity/User");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.forgotPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .min(3, "Password must be at least 3 characters")
        .max(255)
});
exports.forgotPasswordLockAccount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.User.update({ id: userId }, { forgotPasswordLocked: true });
});
exports.createForgotPasswordLink = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = jsonwebtoken_1.sign({ userId }, process.env.EMAIL_TOKEN_SECRET, {
        expiresIn: "20m"
    });
    return `${process.env.FRONTEND_URL}/user/change-password?token=${id}`;
});
//# sourceMappingURL=utils.js.map