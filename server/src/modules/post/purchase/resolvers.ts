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
      { user: userId, stripe }: Context
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

          // Create a customer if one does not already exist
          if (!user.stripeCustomerId) {
            const customer = await stripe.customers.create({
              email: user.email,
              name: `${user.firstName} ${user.lastName}`,
              description: user.id
            });

            user.stripeCustomerId = customer.id;

            await transactionalEntityManager.save(user);
          }

          // Create new stripe checkout session
          const session = await stripe.checkout.sessions.create({
            customer: user.stripeCustomerId as string,
            payment_method_types: ["card"],
            line_items: [
              {
                name: post.name,
                description: post.description,
                images: [post.imageUrl],
                amount: post.price * 100,
                currency: "usd",
                quantity: 1
              }
            ],
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
          });

          post.isPurchased = true;

          transactionalEntityManager.save(post);

          return session.id;
        }
      );
    }
  }
};
