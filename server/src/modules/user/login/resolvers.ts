import { ResolverMap, Context } from "../../../utils/types";
import { User } from "../../../entity/User";
import {
  invalidLogin,
  confirmEmailError,
  forgotPasswordLockedError,
  userNotFoundError
} from "./errorMessages";
import { LoginType } from "./utils";
import { compare } from "bcrypt";
import { sendRefreshToken } from "../../../utils/sendRefreshToken";
import {
  createRefreshToken,
  createAccessToken
} from "../../../utils/createToken";

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (_, { email, password }: LoginType, { response }: Context) => {
      const user = await User.findOne({ where: { email } });

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
