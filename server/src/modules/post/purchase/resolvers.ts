import { ResolverMap, Context } from "../../../types/types";
import { getConnection, EntityManager } from "typeorm";
import { Post } from "../../../entity/Post";
import { postNotFound, postAlreadyPurchased } from "./errorMessages";
import { User } from "../../../entity/User";
import { userNotFoundError } from "../../auth/shared/errorMessages";

export const resolvers: ResolverMap = {
  Mutation: {
    purchase: (
      _,
      { postId }: GQL.IPurchaseOnMutationArguments,
      { user: userId }: Context
    ) => {
      return getConnection().transaction(
        "SERIALIZABLE",
        async (transactionalEntityManager: EntityManager) => {
          // Find post, open new pessimistic transaction
          const post = await transactionalEntityManager.findOne(Post, {
            where: { id: postId },
            lock: { mode: "pessimistic_write" }
          });
          if (!post) {
            throw new postNotFound();
          }

          if (post.isPurchased) {
            throw new postAlreadyPurchased();
          }

          const user = await transactionalEntityManager.findOne(User, {
            where: { id: userId }
          });
          if (!user) {
            throw new userNotFoundError();
          }
        }
      );
    }
  }
};
