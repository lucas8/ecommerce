import React, { useState } from "react";
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

  const onSubmit = async ({ email, password }: Record<string, any>) => {
    const checkMFA = await checkTwoAuth(checkTwoFactor, { email, password });

    if (!checkMFA) {
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
      setTwoFactor(true);
    }
  };

  return (
    <AuthWrapper
      title="Join others creating ecommerce platforms for software"
      description="Lorem ipsum dolor sit amet, consectetur cesing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim."
      hasFooter={true}
    >
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
    </AuthWrapper>
  );
});

export default Login;
