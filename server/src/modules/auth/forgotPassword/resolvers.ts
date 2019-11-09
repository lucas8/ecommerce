import { ResolverMap, Token } from "../../../types/types";
import { User } from "../../../entity/User";
import {
  forgotPasswordLockAccount,
  createForgotPasswordLink,
  forgotPasswordSchema
} from "./utils";
import { verify } from "jsonwebtoken";
import { formatYupError } from "../../../utils/formatYupError";
import { hash } from "bcrypt";
import { sendEmail } from "../../../utils/sendEmail";
import { userNotFoundError } from "../shared/errorMessages";

export const resolvers: ResolverMap = {
  Mutation: {
    sendForgotPasswordEmail: async (
      _,
      { email }: GQL.ISendForgotPasswordEmailOnMutationArguments,
      __
    ) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new userNotFoundError();
      }

      await forgotPasswordLockAccount(user.id);

      const forgotPasswordLink = await createForgotPasswordLink(user.id);

      console.log(forgotPasswordLink);

      sendEmail(user.email, forgotPasswordLink);

      return true;
    },
    forgotPasswordChange: async (
      _,
      { newPassword, token }: GQL.IForgotPasswordChangeOnMutationArguments,
      __
    ) => {
      const { userId } = verify(
        token,
        process.env.EMAIL_TOKEN_SECRET!
      ) as Token;

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
