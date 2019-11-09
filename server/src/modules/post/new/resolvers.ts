import { ResolverMap, Context } from "../../../types/types";
import { Post } from "../../../entity/Post";
import { getUserId } from "../../../utils/getUserId";
import { User } from "../../../entity/User";
import { userNotFoundError } from "../../auth/shared/errorMessages";

export const resolvers: ResolverMap = {
  Mutation: {
    newPost: async (_, args: GQL.INewPostOnMutationArguments, ctx: Context) => {
      const user = await User.findOne({ id: getUserId(ctx) });
      if (!user) {
        throw new userNotFoundError();
      }

      const post = Post.create({
        ...args,
        owner: user
      });

      return post.save();
    }
  }
};
