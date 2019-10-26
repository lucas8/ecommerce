import { ResolverMap, Context } from "../../../utils/types";
import { Site } from "../../../entity/Site";
import { User } from "../../../entity/User";
import { getUserId } from "../../../utils/getUserId";

interface SiteArgs {
  title: string;
  subdomain: string;
}

export const resolvers: ResolverMap = {
  Mutation: {
    newSite: async (_, { title, subdomain }: SiteArgs, ctx: Context) => {
      const user = await User.findOne({ id: getUserId(ctx) });

      const site = Site.create({
        title,
        subdomain,
        owner: user
      });

      // @todo: add heroku subdomain adding logic

      return site.save();
    }
  }
};
