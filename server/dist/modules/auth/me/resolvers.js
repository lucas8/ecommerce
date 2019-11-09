"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../entity/User");
const createMiddleware_1 = require("../../../utils/createMiddleware");
const middleware_1 = require("./middleware");
const getUserId_1 = require("../../../utils/getUserId");
exports.resolvers = {
    Query: {
        me: createMiddleware_1.createMiddleware(middleware_1.default, (_, __, ctx) => User_1.User.findOne({ where: { id: getUserId_1.getUserId(ctx) }, relations: ["posts"] }))
    }
};
//# sourceMappingURL=resolvers.js.map