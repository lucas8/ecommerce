import { ResolverMap } from "../../../utils/types";
import { SignupArgs, signupSchema } from "./utils";
import { formatYupError } from "../../../utils/formatYupError";
import { User } from "../../../entity/User";
import { duplicateEmail } from "./errorMessages";

export const resolvers: ResolverMap = {
  Query: {
    hello: () => "Success"
  },
  Mutation: {
    // prettier-ignore
    signup: async (_, args: SignupArgs, __) => {
      try {
        await signupSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, password, firstName, lastName } = args;

      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"]
      });

      if (userAlreadyExists) {
        throw new duplicateEmail()
      }

      const user = User.create({
        email,
        password,
        firstName,
        lastName
      });

      await user.save()

      return null;
    }
  }
};
