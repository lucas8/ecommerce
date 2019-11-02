import React, { useState } from "react";
import AuthWrapper from "../../components/AuthWrapper";
import { ResponseField } from "../../components/Text";
import Input from "../../components/Input";
import { PurpleButton } from "../../components/Button";
import useForm from "react-hook-form";
import email from "../../static/svg/email.svg";
import { useSendForgotPasswordEmailMutation } from "../../generated/graphql";
import { FormErrors, GraphqlErrors } from "../../components/HandleErrors";

const ForgotPasswordPage = () => {
  const { handleSubmit, register, errors } = useForm();
  const [success, setSuccess] = useState(false);
  const [sendEmail, { error }] = useSendForgotPasswordEmailMutation();

  const onSubmit = async ({ email }: Record<string, any>) => {
    const response = await sendEmail({
      variables: {
        email
      }
    });

    if (response && response.data) {
      setSuccess(true);
    }
  };

  return (
    <AuthWrapper title="Forgot Your Password?">
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Input
          icon={email}
          placeholder="Enter your email"
          type="email"
          name="email"
          ref={register({
            required: "An Email is Required!",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && <FormErrors message={errors.email.message!} />}
        <GraphqlErrors error={error} />
        {success && (
          <ResponseField style={{ marginTop: 10 }} flavor="success">
            Check your email!
          </ResponseField>
        )}
        <PurpleButton style={{ marginTop: 30 }}>Send Email</PurpleButton>
      </form>
    </AuthWrapper>
  );
};

export default ForgotPasswordPage;
