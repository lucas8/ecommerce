import { ResolverMap } from "../../../types/types";
import { Post } from "../../../entity/Post";

export const resolvers: ResolverMap = {
  Query: {
    posts: () => Post.find({ relations: ["owner"] })
  }
};
