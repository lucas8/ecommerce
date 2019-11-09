import { ResolverMap } from "../../../types/types";
import { signupSchema, createConfirmationEmail } from "./utils";
import { formatYupError } from "../../../utils/formatYupError";
import { User } from "../../../entity/User";
import { duplicateEmail } from "./errorMessages";
import { generateSecret } from "speakeasy";
import { sendEmail } from "../../../utils/sendEmail";
import { generateQRCode } from "../shared/generateQrCode";

export const resolvers: ResolverMap = {
  Mutation: {
    // prettier-ignore
    signup: async (_, args: GQL.ISignupOnMutationArguments, __) => {
      try {
        await signupSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, hasTwoFactor } = args;

      const userAlreadyExists: User | undefined = await User.findOne({ email });

      if (userAlreadyExists) {
        throw new duplicateEmail();
      }

      const secret = generateSecret({ length: 20 });

      console.log(await generateQRCode(secret.base32!, email));

      const user: User = User.create({
        ...args,
        hasTwoFactor: hasTwoFactor || false,
        twoFactorChallenge: hasTwoFactor ? secret.base32 : undefined
      });

      await user.save();

      const confirmationLink: string = await createConfirmationEmail(user.id);

      sendEmail(user.email, confirmationLink);

      return null;
    }
  }
};
