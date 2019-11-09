import { ResolverMap, Token } from "../../../types/types";
import { verify } from "jsonwebtoken";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  Mutation: {
    confirmEmail: async (_, { token }: any, __) => {
      const { userId } = verify(
        token,
        process.env.EMAIL_TOKEN_SECRET!
      ) as Token;

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
