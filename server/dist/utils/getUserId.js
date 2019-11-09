"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
exports.getUserId = (context) => {
    const Authorization = context.request.get("Authorization");
    if (Authorization) {
        const token = Authorization.replace("Bearer ", "");
        const verifiedToken = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return verifiedToken && verifiedToken.userId;
    }
    else {
        return;
    }
};
//# sourceMappingURL=getUserId.js.map