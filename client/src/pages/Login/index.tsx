import React from "react";
import { PageHeader, PageDescription } from "../../components/Text";
import { LoginRedirectWrapper, SignupRedirectLink } from "./style";
import useForm from "react-hook-form";
import { RouteComponentProps } from "react-router-dom";
import AuthWrapper from "../../components/AuthWrapper";
import { useAuthContext } from "../../contexts/Auth";
import LoginForm from "./LoginForm";
import {
  useCheckTwoFactorMutation,
  useLoginMutation
} from "../../generated/graphql";
import { checkTwoAuth, loginUser } from "../../api";

interface TParams {
  history: string | undefined;
}

export const Login = React.memo(({ history }: RouteComponentProps<TParams>) => {
  const { handleSubmit, register, errors } = useForm();
  const { dispatch, state } = useAuthContext();

  const [checkTwoFactor] = useCheckTwoFactorMutation();
  const [login] = useLoginMutation();

  const onSubmit = async ({ email, password }: Record<string, any>) => {
    const hasTwoFactor = await checkTwoAuth(checkTwoFactor, { email });

    if (!hasTwoFactor) {
      await loginUser(login, { email, password });
      history.push("/dashboard");
    } else {
      dispatch({
        type: "LOGIN",
        payload: {
          email,
          password
        }
      });
      console.log("2fac on");
    }
  };

  console.log(state);

  return (
    <AuthWrapper>
      <div style={{ width: "100%" }}>
        <PageHeader>
          Join others creating ecommerce platforms for software
        </PageHeader>
        <PageDescription style={{ marginTop: 20 }}>
          Lorem ipsum dolor sit amet, consectetur cesing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
        </PageDescription>
      </div>
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
      <LoginRedirectWrapper>
        <span>
          Don't have an account?{" "}
          <SignupRedirectLink to="/user/signup">Sign up.</SignupRedirectLink>
        </span>
        <SignupRedirectLink to="/user/forgot">
          Forgot password?
        </SignupRedirectLink>
      </LoginRedirectWrapper>
    </AuthWrapper>
  );
});

export default Login;
