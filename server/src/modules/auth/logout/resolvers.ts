import { ResolverMap, Context } from "../../../types/types";
import { sendRefreshToken } from "../../../utils/sendRefreshToken";

export const resolvers: ResolverMap = {
  Mutation: {
    logout: (_, __, { response }: Context) => {
      sendRefreshToken(response, "");

      return true;
    }
  }
};
