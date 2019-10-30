import React, { useState } from "react";
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
import TwoFactor from "../../components/TwoFactor";

export const Login = React.memo(({ history }: RouteComponentProps) => {
  const { handleSubmit, register, errors } = useForm();
  const { dispatch } = useAuthContext();
  const [hasTwoFactor, setTwoFactor] = useState(false);

  const [
    checkTwoFactor,
    { error: twoFactorErrors }
  ] = useCheckTwoFactorMutation();
  const [login, { error }] = useLoginMutation();

  console.log(error);

  const onSubmit = async ({ email, password }: Record<string, any>) => {
    const checkMFA = await checkTwoAuth(checkTwoFactor, { email, password });

    if (!checkMFA) {
      const response = await loginUser(login, { email, password });

      history.push("/dashboard");
    } else {
      dispatch({
        type: "LOGIN",
        payload: {
          email,
          password
        }
      });
      setTwoFactor(true);
    }
  };

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
      {hasTwoFactor ? (
        <TwoFactor />
      ) : (
        <LoginForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          error={error}
          twoFactorError={twoFactorErrors}
        />
      )}
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
