import { ResolverMap, Context } from "../../../types/types";
import { sendRefreshToken } from "../../../utils/sendRefreshToken";
import { User } from "../../../entity/User";
import { getUserId } from "../../../utils/getUserId";
import { userNotFoundError } from "../shared/errorMessages";

export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, __, ctx: Context) => {
      const { response } = ctx;

      const user = await User.findOne({ id: getUserId(ctx) });
      if (!user) {
        throw new userNotFoundError();
      }

      user.tokenVersion++;
      user.save();

      // assure that the cookie is empty on the client side
      sendRefreshToken(response, "");

      return true;
    }
  }
};
