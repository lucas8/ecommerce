import { ResolverMap } from "../../../utils/types";
import { verify } from "jsonwebtoken";
import { User } from "../../../entity/User";

interface TokenObject {
  userId: string;
}

export const resolvers: ResolverMap = {
  Mutation: {
    confirmEmail: async (_, { token }: { token: string }, __) => {
      const { userId } = verify(
        token,
        process.env.EMAIL_TOKEN_SECRET!
      ) as TokenObject;

      await User.update(
        { id: userId },
        {
          confirmed: true
        }
      );

      return true;
    }
  }
};
