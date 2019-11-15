import { rule, shield, and } from "graphql-shield";
import { Context } from "../types/types";
import { User } from "../entity/User";

const isAuthenticated = rule()(async (_, __, { user }: Context, ___) => {
  return user !== undefined;
});

const hasConfirmedEmail = rule()(
  async (_, __, { user: userId }: Context, ___) => {
    const user = await User.findOne({ id: userId as any });
    if (!user) {
      return false;
    }

    if (user.confirmed) {
      return true;
    }

    return false;
  }
);

export const permissions = shield({
  Query: {
    me: isAuthenticated
  },
  Mutation: {
    logout: isAuthenticated,
    newPost: and(isAuthenticated, hasConfirmedEmail),
    purchase: and(isAuthenticated, hasConfirmedEmail)
  }
});
