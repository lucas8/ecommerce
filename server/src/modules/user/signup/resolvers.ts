import { ResolverMap } from "../../../utils/types";
import { signupSchema, createConfirmationEmail } from "./utils";
import { formatYupError } from "../../../utils/formatYupError";
import { User } from "../../../entity/User";
import { duplicateEmail } from "./errorMessages";
import { generateSecret } from "speakeasy";
import { sendEmail } from "../../../utils/sendEmail";
import { generateQRCode } from "../shared/generateQrCode";

interface SignupArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  hasTwoFactor?: boolean;
}

export const resolvers: ResolverMap = {
  Mutation: {
    // prettier-ignore
    signup: async (_, args: SignupArgs, __) => {
      try {
        await signupSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, password, firstName, lastName, hasTwoFactor }: SignupArgs = args;

      const userAlreadyExists: User | undefined = await User.findOne({ email });

      if (userAlreadyExists) {
        throw new duplicateEmail();
      }

      const secret = generateSecret({ length: 20 });

      console.log(await generateQRCode(secret.base32!, email));
  
      const user: User = User.create({
        email,
        password,
        firstName,
        lastName,
        hasTwoFactor,
        twoFactorChallenge: hasTwoFactor ? secret.base32 : undefined
      });

      await user.save();

      const confirmationLink: string = await createConfirmationEmail(user.id);
      
      sendEmail(user.email, confirmationLink);

      return null;
    }
  }
};
