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
  const { actions } = useAuthContext();
  const [hasTwoFactor, setTwoFactor] = useState(false);

  const [
    checkTwoFactor,
    { error: twoFactorErrors }
  ] = useCheckTwoFactorMutation();
  const [login, { error }] = useLoginMutation();

  const onSubmit = async ({
    usernameOrEmail,
    password
  }: Record<string, any>) => {
    const checkMFA = await checkTwoAuth(checkTwoFactor, {
      usernameOrEmail,
      password
    });

    if (!checkMFA) {
      await loginUser(login, { usernameOrEmail, password });
      history.push("/feed");
    } else {
      actions.setAuthState({ usernameOrEmail, password });
      setTwoFactor(true);
    }
  };

  return (
    <AuthWrapper
      title="Join others creating the first social ecommerce platform"
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
