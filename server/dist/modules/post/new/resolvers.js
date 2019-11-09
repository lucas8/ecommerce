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
const Post_1 = require("../../../entity/Post");
const getUserId_1 = require("../../../utils/getUserId");
const User_1 = require("../../../entity/User");
const errorMessages_1 = require("../../auth/shared/errorMessages");
exports.resolvers = {
    Mutation: {
        newPost: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ id: getUserId_1.getUserId(ctx) });
            if (!user) {
                throw new errorMessages_1.userNotFoundError();
            }
            const post = Post_1.Post.create(Object.assign(Object.assign({}, args), { owner: user }));
            return post.save();
        })
    }
};
//# sourceMappingURL=resolvers.js.map