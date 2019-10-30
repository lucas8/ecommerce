import React, { useState } from "react";
import AuthWrapper from "../../components/AuthWrapper";
import { PageHeader, Success } from "../../components/Text";
import Input from "../../components/Input";
import { PurpleButton } from "../../components/Button";
import useForm from "react-hook-form";
import { FormErrors, GraphqlErrors } from "../../components/HandleErrors";
import { useForgotPasswordChangeMutation } from "../../generated/graphql";
import key from "../../static/svg/key.svg";

interface Props {
  location: Location;
}

const ChangePassword = React.memo(({ location }: any) => {
  const { handleSubmit, register, errors } = useForm();
  const [success, setSuccess] = useState(false);
  const [match, setMatch] = useState("");
  const [changePassword, { error }] = useForgotPasswordChangeMutation();

  // prettier-ignore
  const onSubmit = async ({ password, confirmPassword }: Record<string, any>) => {
    const token = new URLSearchParams(location.search).get("token")

    if (password !== confirmPassword){
      return setMatch("Passwords do not match");
    }

    if(!token) {
      return setMatch("Token is not in request header");
    }

    const response = await changePassword({
      variables:{
        newPassword: password,
        token
      }
    });

    if(response && response.data){
      setSuccess(true)
    }
  };

  return (
    <AuthWrapper>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <div style={{ width: "100%", marginBottom: 30 }}>
          <PageHeader>Change Password</PageHeader>
        </div>
        <Input
          icon={key}
          placeholder="Enter a password"
          type="password"
          name="password"
          ref={register({
            required: "A Password is Required!"
          })}
        />
        {errors.password && <FormErrors message={errors.password.message!} />}
        <Input
          icon={key}
          placeholder="Confirm your password"
          type="password"
          name="confirmPassword"
          containerStyle={{ marginTop: 30 }}
          ref={register({
            required: "A Password is Required!"
          })}
        />
        {errors.confirmPassword && (
          <FormErrors message={errors.confirmPassword.message!} />
        )}
        {match && <FormErrors message={match} />}
        <GraphqlErrors error={error} />
        {success && (
          <Success style={{ marginTop: 10 }}>Password changed!</Success>
        )}
        <PurpleButton style={{ marginTop: 30 }}>Change Password</PurpleButton>
      </form>
    </AuthWrapper>
  );
});

export default ChangePassword;
