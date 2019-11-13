import { ResolverMap } from "../../../types/types";

export const resolvers: ResolverMap = {
  Mutation: {
    purchase: (_, { postId }: GQL.IPurchaseOnMutationArguments, __) => {
      console.log(postId);
      return true;
    }
  }
};
