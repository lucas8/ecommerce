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
import { userNotFoundError } from "../shared/errorMessages";
import { noTokenProvided } from "../signup/errorMessages";
import { totp } from "speakeasy";

interface LoginArgs {
  email: string;
  password: string;
  token?: string;
}

export const resolvers: ResolverMap = {
  Mutation: {
    checkTwoFactor: async (_, { email }: LoginArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new userNotFoundError();
      }

      if (user.hasTwoFactor) {
        return true;
      }

      return false;
    },
    login: async (
      _,
      { email, password, token }: LoginArgs,
      { response }: Context
    ) => {
      const user = await User.findOne({ email });

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
