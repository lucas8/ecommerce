import React from "react";
import Input from "../../components/Input";
import { FormErrors } from "../../components/HandleErrors";
import { PurpleButton } from "../../components/Button";
import key from "../../static/svg/key.svg";
import email from "../../static/svg/email.svg";
import { Danger } from "../../components/Text";
import { FieldError } from "react-hook-form/dist/types";

const LoginForm = ({
  onSubmit,
  register,
  errors
}: {
  onSubmit(e: React.BaseSyntheticEvent): Promise<void>;
  register: any;
  errors: Partial<Record<string, FieldError>>;
}) => {
  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
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
      {errors.email && (
        <Danger style={{ marginTop: 10 }}>{errors.email.message}</Danger>
      )}
      <Input
        icon={key}
        placeholder="Enter your password"
        type="password"
        containerStyle={{ marginTop: 30 }}
        name="password"
        ref={register({
          required: "A Password is Required!"
        })}
      />
      {errors.password && <FormErrors message={errors.password.message!} />}
      <PurpleButton style={{ marginTop: 30 }} type="submit">
        Login to your account
      </PurpleButton>
    </form>
  );
};

export default LoginForm;
