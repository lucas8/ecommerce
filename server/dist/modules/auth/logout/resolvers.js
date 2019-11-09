"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendRefreshToken_1 = require("../../../utils/sendRefreshToken");
exports.resolvers = {
    Mutation: {
        logout: (_, __, { response }) => {
            sendRefreshToken_1.sendRefreshToken(response, "");
            return true;
        }
    }
};
//# sourceMappingURL=resolvers.js.map