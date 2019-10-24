import { ResolverMap } from "../../../utils/types";
import { User } from "../../../entity/User";
import {
  forgotPasswordLockAccount,
  createForgotPasswordLink,
  forgotPasswordSchema
} from "./utils";
import { userNotFoundError } from "../shared/errorMessages";
import { verify } from "jsonwebtoken";
import { formatYupError } from "../../../utils/formatYupError";
import { hash } from "bcrypt";
import { sendEmail } from "../../../utils/sendEmail";

interface TokenObject {
  userId: string;
}

interface ForgotPasswordArgs {
  newPassword: string;
  token: string;
}

export const resolvers: ResolverMap = {
  Mutation: {
    sendForgotPasswordEmail: async (_, { email }: { email: string }, __) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new userNotFoundError();
      }

      await forgotPasswordLockAccount(user.id);

      const forgotPasswordLink = await createForgotPasswordLink(user.id);

      sendEmail(user.email, forgotPasswordLink);

      return true;
    },
    forgotPasswordChange: async (
      _,
      { newPassword, token }: ForgotPasswordArgs,
      __
    ) => {
      const { userId } = verify(
        token,
        process.env.EMAIL_TOKEN_SECRET!
      ) as TokenObject;

      try {
        await forgotPasswordSchema.validate(
          { newPassword },
          { abortEarly: false }
        );
      } catch (err) {
        return formatYupError(err);
      }

      const hashedPassword = await hash(newPassword, 10);

      await User.update(
        { id: userId },
        {
          forgotPasswordLocked: false,
          password: hashedPassword
        }
      );

      return true;
    }
  }
};
