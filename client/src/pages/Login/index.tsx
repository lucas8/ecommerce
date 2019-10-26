import React from "react";
import { PageHeader, PageDescription } from "../../components/Text";
import Input from "../../components/Input";
import email from "../../static/svg/email.svg";
import {
  LoginPageContainer,
  LoginFormContainer,
  LoginGraphicContainer,
  LoginRedirectWrapper,
  SignupRedirectLink
} from "./style";
import key from "../../static/svg/key.svg";
import { PurpleButton } from "../../components/Button";
import useForm from "react-hook-form";
import { useLoginMutation, MeDocument } from "../../generated/graphql";
import { setAccessToken } from "../../accessToken";

export const Login = React.memo(() => {
  const [login] = useLoginMutation();
  const { handleSubmit, register } = useForm();

  const onSubmit = async ({ email, password }: any) => {
    const response = await login({
      variables: {
        email,
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LoginPageContainer>
        <LoginGraphicContainer />
        <LoginFormContainer>
          <PageHeader style={{ marginBottom: 30 }}>
            Join others creating ecommerce platforms for software
          </PageHeader>
          <PageDescription style={{ marginBottom: 40 }}>
            Lorem ipsum dolor sit amet, consectetur cesing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam.
          </PageDescription>
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
          <PurpleButton style={{ marginTop: 40 }} type="submit">
            Login to your account
          </PurpleButton>
          <LoginRedirectWrapper>
            Don't have an account?{" "}
            <SignupRedirectLink to="/dashboard">Sign up.</SignupRedirectLink>
          </LoginRedirectWrapper>
        </LoginFormContainer>
      </LoginPageContainer>
    </form>
  );
});

export default Login;
