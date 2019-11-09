"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = (res, token) => {
    res.cookie("qid", token, {
        httpOnly: true
    });
};
//# sourceMappingURL=sendRefreshToken.js.map