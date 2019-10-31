import { ResolverMap } from "../../../utils/types";
import { Post } from "../../../entity/Post";

export const resolvers: ResolverMap = {
    Query: {
        posts: () => Post.find({ relations: ["owner"] })
    }
}