import { CheckTwoFactorMutationFn, MeDocument, LoginMutationFn } from "../generated/graphql";
import { LoginArgs } from "../types";
import { setAccessToken } from "../accessToken";

type CheckTwoAuthArgs = {
    email: string
}

export const checkTwoAuth = async (checkTwoFactor: CheckTwoFactorMutationFn, { email }: CheckTwoAuthArgs): Promise<boolean> => {
    const response = await checkTwoFactor({
        variables: {
            email
        }
    });

    if (response && response.data && response.data.checkTwoFactor) {
        return true
    } else {
        return false
    }
}

export const loginUser = async (login: LoginMutationFn, { email, password }: LoginArgs): Promise<void> => {
    const response = await login({
        variables: {
            email,
            password
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