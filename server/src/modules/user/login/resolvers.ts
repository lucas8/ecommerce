import { ResolverMap, Context } from "../../../utils/types";
import { User } from "../../../entity/User";
import {
  invalidLogin,
  confirmEmailError,
  forgotPasswordLockedError
} from "./errorMessages";
import { compare } from "bcrypt";
import { sendRefreshToken } from "../../../utils/sendRefreshToken";
import {
  createRefreshToken,
  createAccessToken
} from "../../../utils/createToken";
import { userNotFoundError } from "../shared/errorMessages";

interface LoginArgs {
  email: string;
  password: string;
}

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (_, { email, password }: LoginArgs, { response }: Context) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new userNotFoundError();
      }

      if (!user.confirmed) {
        throw new confirmEmailError();
      }

      if (user.forgotPasswordLocked) {
        throw new forgotPasswordLockedError();
      }

      const valid = await compare(password, user.password);

      if (!valid) {
        throw new invalidLogin();
      }

      sendRefreshToken(response, createRefreshToken(user));

      return {
        token: createAccessToken(user),
        user
      };
    }
  }
};
