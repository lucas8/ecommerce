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
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../../../entity/User");
exports.resolvers = {
    Mutation: {
        confirmEmail: (_, { token }, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { userId } = jsonwebtoken_1.verify(token, process.env.EMAIL_TOKEN_SECRET);
            yield User_1.User.update({ id: userId }, {
                confirmed: true
            });
            return true;
        })
    }
};
//# sourceMappingURL=resolvers.js.map