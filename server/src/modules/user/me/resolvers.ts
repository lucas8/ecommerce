import { ResolverMap, Context } from "../../../utils/types";
import { User } from "../../../entity/User";
import { createMiddleware } from "../../../utils/createMiddleware";
import middleware from "./middleware";
import { getUserId } from "../../../utils/getUserId";

export const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(middleware, (_, __, ctx: Context) =>
      User.findOne({ id: getUserId(ctx) })
    )
  }
};
