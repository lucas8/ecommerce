import React from "react";
import "./style.css";
import Input from "../Input";
import useForm from "react-hook-form";
import { PurpleButton } from "../Button";
import { useAuthContext } from "../../contexts/Auth";
import { loginUser } from "../../api";
import { useLoginMutation } from "../../generated/graphql";
import { Danger } from "../Text";
import { GraphqlErrors } from "../HandleErrors";
import { withRouter, RouteComponentProps } from "react-router-dom";

type formArgs = {
  token?: string;
};

const TwoFactor = ({ history }: RouteComponentProps) => {
  const { handleSubmit, register, errors } = useForm();
  const [login, { error }] = useLoginMutation();
  const { state } = useAuthContext();

  const onSubmit = async ({ token }: formArgs) => {
    const { usernameOrEmail, password } = state;

    await loginUser(login, { usernameOrEmail, password, token });

    history.push("/feed");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Input
        placeholder="Enter your 2fa code"
        type="text"
        name="token"
        maxLength={6}
        ref={register({
          required: "2fa code is required!"
        })}
      />
      {errors.token && (
        <Danger style={{ marginTop: 10 }}>{errors.token.message}</Danger>
      )}
      <GraphqlErrors error={error} />
      <PurpleButton style={{ marginTop: 30 }} type="submit">
        Login to your account
      </PurpleButton>
    </form>
  );
};

export default withRouter(TwoFactor);
