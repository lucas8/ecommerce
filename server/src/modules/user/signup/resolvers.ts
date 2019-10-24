import { ResolverMap } from "../../../utils/types";
import { signupSchema, createConfirmationEmail } from "./utils";
import { formatYupError } from "../../../utils/formatYupError";
import { User } from "../../../entity/User";
import { duplicateEmail } from "./errorMessages";
import { sendEmail } from "../../../utils/sendEmail";

interface SignupArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

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

      const { email, password, firstName, lastName }: SignupArgs = args;

      const userAlreadyExists: User | undefined = await User.findOne({ email });

      if (userAlreadyExists) {
        throw new duplicateEmail()
      }

      const user: User = User.create({
        email,
        password,
        firstName,
        lastName
      });

      await user.save()

      const confirmationLink: string = await createConfirmationEmail(user.id)
      
      sendEmail(user.email, confirmationLink);

      return null;
    }
  }
};
