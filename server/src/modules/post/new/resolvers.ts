import { ResolverMap, Context } from "../../../utils/types";
import { Post } from "../../../entity/Post";
import { getUserId } from "../../../utils/getUserId";
import { User } from "../../../entity/User";
import { userNotFoundError } from "../../auth/shared/errorMessages";

interface NewPostArgs {
    name: string;
    imageUrl: string;
    price: number;
    description: string;
}

export const resolvers: ResolverMap = {
    Mutation: {
        newPost: async (_, { name, imageUrl, price, description }: NewPostArgs, ctx: Context) => {
            const user = await User.findOne({ id: getUserId(ctx) })
            if (!user) {
                throw new userNotFoundError()
            }

            const post = Post.create({
                name,
                imageUrl,
                price,
                description,
                owner: user,
            })

            return post.save()
        }
    }
}