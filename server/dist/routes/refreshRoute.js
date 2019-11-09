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
const User_1 = require("../entity/User");
const sendRefreshToken_1 = require("../utils/sendRefreshToken");
const createToken_1 = require("../utils/createToken");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.RefreshRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.qid;
    if (!token) {
        return res.send({ success: false, accessToken: "" });
    }
    let payload = null;
    try {
        payload = jsonwebtoken_1.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (err) {
        return res.send({ success: false, accessToken: "" });
    }
    const user = yield User_1.User.findOne({ id: payload.userId });
    if (!user) {
        return res.send({ success: false, accessToken: "" });
    }
    if (user.tokenVersion !== payload.tokenVersion) {
        return res.send({ success: false, accessToken: "" });
    }
    sendRefreshToken_1.sendRefreshToken(res, createToken_1.createRefreshToken(user));
    return res.send({ success: true, accessToken: createToken_1.createAccessToken(user) });
});
//# sourceMappingURL=refreshRoute.js.map