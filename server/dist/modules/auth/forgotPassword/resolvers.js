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
const User_1 = require("../../../entity/User");
const utils_1 = require("./utils");
const jsonwebtoken_1 = require("jsonwebtoken");
const formatYupError_1 = require("../../../utils/formatYupError");
const bcrypt_1 = require("bcrypt");
const sendEmail_1 = require("../../../utils/sendEmail");
const errorMessages_1 = require("../shared/errorMessages");
exports.resolvers = {
    Mutation: {
        sendForgotPasswordEmail: (_, { email }, __) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ email });
            if (!user) {
                throw new errorMessages_1.userNotFoundError();
            }
            yield utils_1.forgotPasswordLockAccount(user.id);
            const forgotPasswordLink = yield utils_1.createForgotPasswordLink(user.id);
            console.log(forgotPasswordLink);
            sendEmail_1.sendEmail(user.email, forgotPasswordLink);
            return true;
        }),
        forgotPasswordChange: (_, { newPassword, token }, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { userId } = jsonwebtoken_1.verify(token, process.env.EMAIL_TOKEN_SECRET);
            try {
                yield utils_1.forgotPasswordSchema.validate({ newPassword }, { abortEarly: false });
            }
            catch (err) {
                return formatYupError_1.formatYupError(err);
            }
            const hashedPassword = yield bcrypt_1.hash(newPassword, 10);
            yield User_1.User.update({ id: userId }, {
                forgotPasswordLocked: false,
                password: hashedPassword
            });
            return true;
        })
    }
};
//# sourceMappingURL=resolvers.js.map