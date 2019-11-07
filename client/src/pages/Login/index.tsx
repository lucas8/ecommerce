import React, { useState } from "react";
import Input from "../../components/Input";
import useForm from "react-hook-form";
import Button from "../../components/Button";
import { StyledLoginContainer, StyledForm } from "./style";
import { TitleText, DescriptionText } from "../../components/Typography";
import { StyledLink } from "../../components/Link";

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const { register: loginRef, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    setLoading(true);
  };

  return (
    <StyledLoginContainer>
      <TitleText style={{ marginBottom: 5 }}>Login</TitleText>
      <DescriptionText style={{ fontWeight: 600, marginBottom: 60 }}>
        Don’t have an account?{" "}
        <StyledLink to="/signup">Sign up here</StyledLink>
      </DescriptionText>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          label="Your Email:"
          ref={loginRef({ required: "An Email is Required!" })}
          error={errors.email}
          style={{ marginBottom: 30 }}
        />
        <Input
          name="password"
          label="Password:"
          ref={loginRef({ required: "A Password is Required!" })}
          error={errors.password}
        />
        <Button flavor="LOGIN" type="submit" isLoading={isLoading}>
          {isLoading ? "logging in" : "login"}
        </Button>
      </StyledForm>
    </StyledLoginContainer>
  );
};

export default Login;
