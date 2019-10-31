import { ResolverMap, Context } from "../../../utils/types";
import { User } from "../../../entity/User";
import {
  invalidLogin,
  confirmEmailError,
  forgotPasswordLockedError,
  incorrectTwoFactor
} from "./errorMessages";
import { compare } from "bcrypt";
import { sendRefreshToken } from "../../../utils/sendRefreshToken";
import {
  createRefreshToken,
  createAccessToken
} from "../../../utils/createToken";
import { noTokenProvided } from "../signup/errorMessages";
import { totp } from "speakeasy";

interface LoginArgs {
  usernameOrEmail: string;
  password: string;
  token?: string;
}

export const resolvers: ResolverMap = {
  Mutation: {
    checkTwoFactor: async (_, { usernameOrEmail, password }: LoginArgs) => {
      let user = await User.findOne({ email: usernameOrEmail })

      if (!user) {
        user = await User.findOne({ username: usernameOrEmail })
      }

      if (!user) {
        throw new invalidLogin();
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

      if (user.hasTwoFactor) {
        return true
      } else {
        return false
      }
    },
    login: async (
      _,
      { usernameOrEmail, password, token }: LoginArgs,
      { response }: Context
    ) => {
      let user = await User.findOne({ email: usernameOrEmail })

      if (!user) {
        user = await User.findOne({ username: usernameOrEmail })
      }

      if (!user) {
        throw new invalidLogin();
      }

      if (!user.confirmed) {
        throw new confirmEmailError();
      }

      if (user.forgotPasswordLocked) {
        throw new forgotPasswordLockedError();
      }

      if (user.hasTwoFactor && !token) {
        throw new noTokenProvided();
      } else if (user.hasTwoFactor && token) {
        const verified = totp.verify({
          secret: user.twoFactorChallenge,
          encoding: "base32",
          token
        });

        if (!verified) {
          throw new incorrectTwoFactor();
        }
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