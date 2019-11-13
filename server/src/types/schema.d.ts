// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
me: IUser | null;
posts: Array<IPost | null>;
}

interface IUser {
__typename: "User";
id: string;
username: string;
firstName: string;
lastName: string;
email: string;
password: string;
hasTwoFactor: boolean;
posts: Array<IPost | null>;
}

interface IPost {
__typename: "Post";
id: string;
name: string;
imageUrl: string;
price: number;
description: string;
owner: IUser;
}

interface IMutation {
__typename: "Mutation";
confirmEmail: boolean | null;
sendForgotPasswordEmail: boolean | null;
forgotPasswordChange: boolean | null;
login: IAuthResponse;
checkTwoFactor: boolean;
logout: boolean;
signup: boolean | null;
newPost: IPost;
purchase: boolean;
}

interface IConfirmEmailOnMutationArguments {
token: string;
}

interface ISendForgotPasswordEmailOnMutationArguments {
email: string;
}

interface IForgotPasswordChangeOnMutationArguments {
newPassword: string;
token: string;
}

interface ILoginOnMutationArguments {
usernameOrEmail: string;
password: string;
token?: string | null;
}

interface ICheckTwoFactorOnMutationArguments {
usernameOrEmail: string;
password: string;
}

interface ISignupOnMutationArguments {
firstName: string;
lastName: string;
email: string;
password: string;

  /**
   * @default false
   */
hasTwoFactor?: boolean | null;
username: string;
}

interface INewPostOnMutationArguments {
name: string;
imageUrl: string;
price: number;
description: string;
}

interface IPurchaseOnMutationArguments {
postId: string;
}

interface IAuthResponse {
__typename: "AuthResponse";
user: IUser;
token: string;
}
}

// tslint:enable
