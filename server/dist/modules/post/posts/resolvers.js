"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("../../../entity/Post");
exports.resolvers = {
    Query: {
        posts: () => Post_1.Post.find({ relations: ["owner"] })
    }
};
//# sourceMappingURL=resolvers.js.map