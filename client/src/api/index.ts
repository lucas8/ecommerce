import { CheckTwoFactorMutationFn, MeDocument, LoginMutationFn, LoginMutationVariables, CheckTwoFactorMutationVariables } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

// prettier-ignore
export const checkTwoAuth = async (checkTwoFactor: CheckTwoFactorMutationFn, { email, password }: CheckTwoFactorMutationVariables): Promise<boolean> => {
    const response = await checkTwoFactor({
        variables: {
            email,
            password
        }
    });

    if (response && response.data && response.data.checkTwoFactor) {
        return true
    } else {
        return false
    }
}

// prettier-ignore
export const loginUser = async (login: LoginMutationFn, { email, password, token }: LoginMutationVariables): Promise<void> => {
    const response = await login({
        variables: {
            email,
            password,
            token
        },
        update: (store: any, { data }: any) => {
            if (!data || !data.login) {
                return null;
            }

            store.writeQuery({
                query: MeDocument,
                data: {
                    me: data.login.user
                }
            });
        }
    });

    if (response && response.data) {
        setAccessToken(response.data.login.token);
    }
}