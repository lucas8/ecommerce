import { ResolverMap } from "../../../utils/types";
import { User } from "../../../entity/User";
import { userNotFoundError } from "./errorMessages";
import { forgotPasswordLockAccount, createForgotPasswordLink } from "./utils";

export const resolvers: ResolverMap = {
  Mutation: {
    sendForgotPasswordEmail: async (_, { email }: { email: string }, __) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return [
          {
            path: "email",
            message: userNotFoundError
          }
        ];
      }

      await forgotPasswordLockAccount(user.id);

      const forgotPasswordLink = await createForgotPasswordLink(user.id);

      return true;
    }
  }
};
