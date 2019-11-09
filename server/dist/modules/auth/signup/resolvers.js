"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const formatYupError_1 = require("../../../utils/formatYupError");
const User_1 = require("../../../entity/User");
const errorMessages_1 = require("./errorMessages");
const speakeasy_1 = require("speakeasy");
const sendEmail_1 = require("../../../utils/sendEmail");
const generateQrCode_1 = require("../shared/generateQrCode");
exports.resolvers = {
    Mutation: {
        signup: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield utils_1.signupSchema.validate(args, { abortEarly: false });
            }
            catch (err) {
                return formatYupError_1.formatYupError(err);
            }
            const { email, hasTwoFactor } = args;
            const userAlreadyExists = yield User_1.User.findOne({ email });
            if (userAlreadyExists) {
                throw new errorMessages_1.duplicateEmail();
            }
            const secret = speakeasy_1.generateSecret({ length: 20 });
            console.log(yield generateQrCode_1.generateQRCode(secret.base32, email));
            const user = User_1.User.create(Object.assign(Object.assign({}, args), { hasTwoFactor: hasTwoFactor || false, twoFactorChallenge: hasTwoFactor ? secret.base32 : undefined }));
            yield user.save();
            const confirmationLink = yield utils_1.createConfirmationEmail(user.id);
            sendEmail_1.sendEmail(user.email, confirmationLink);
            return null;
        })
    }
};
//# sourceMappingURL=resolvers.js.map