import {
  LoginMutationFn,
  LoginMutationVariables,
  MeDocument,
  LoginMutationResult
} from "../generated/graphql";
import { setAccessToken } from "../accessToken";

export const loginUser = async (
  login: LoginMutationFn,
  { usernameOrEmail, password }: LoginMutationVariables
): Promise<LoginMutationResult | undefined> => {
  const response = await login({
    variables: {
      usernameOrEmail,
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

  return response as LoginMutationResult;
};
