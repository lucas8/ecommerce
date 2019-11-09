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
const errorMessages_1 = require("./errorMessages");
const bcrypt_1 = require("bcrypt");
const sendRefreshToken_1 = require("../../../utils/sendRefreshToken");
const createToken_1 = require("../../../utils/createToken");
const errorMessages_2 = require("../signup/errorMessages");
const speakeasy_1 = require("speakeasy");
exports.resolvers = {
    Mutation: {
        checkTwoFactor: (_, { usernameOrEmail, password }) => __awaiter(void 0, void 0, void 0, function* () {
            let user = yield User_1.User.findOne({ email: usernameOrEmail });
            if (!user) {
                user = yield User_1.User.findOne({ username: usernameOrEmail });
            }
            if (!user) {
                throw new errorMessages_1.invalidLogin();
            }
            if (!user.confirmed) {
                throw new errorMessages_1.confirmEmailError();
            }
            if (user.forgotPasswordLocked) {
                throw new errorMessages_1.forgotPasswordLockedError();
            }
            const valid = yield bcrypt_1.compare(password, user.password);
            if (!valid) {
                throw new errorMessages_1.invalidLogin();
            }
            if (user.hasTwoFactor) {
                return true;
            }
            else {
                return false;
            }
        }),
        login: (_, { usernameOrEmail, password, token }, { response }) => __awaiter(void 0, void 0, void 0, function* () {
            let user = yield User_1.User.findOne({ email: usernameOrEmail });
            if (!user) {
                user = yield User_1.User.findOne({ username: usernameOrEmail });
            }
            if (!user) {
                throw new errorMessages_1.invalidLogin();
            }
            if (!user.confirmed) {
                throw new errorMessages_1.confirmEmailError();
            }
            if (user.forgotPasswordLocked) {
                throw new errorMessages_1.forgotPasswordLockedError();
            }
            if (user.hasTwoFactor && !token) {
                throw new errorMessages_2.noTokenProvided();
            }
            else if (user.hasTwoFactor && token) {
                const verified = speakeasy_1.totp.verify({
                    secret: user.twoFactorChallenge,
                    encoding: "base32",
                    token
                });
                if (!verified) {
                    throw new errorMessages_1.incorrectTwoFactor();
                }
            }
            const valid = yield bcrypt_1.compare(password, user.password);
            if (!valid) {
                throw new errorMessages_1.invalidLogin();
            }
            sendRefreshToken_1.sendRefreshToken(response, createToken_1.createRefreshToken(user));
            return {
                token: createToken_1.createAccessToken(user),
                user
            };
        })
    }
};
//# sourceMappingURL=resolvers.js.map