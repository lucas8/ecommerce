import React from "react";
import { PageHeader, PageDescription, Danger } from "../../components/Text";
import Input from "../../components/Input";
import email from "../../static/svg/email.svg";
import { LoginRedirectWrapper, SignupRedirectLink } from "./style";
import key from "../../static/svg/key.svg";
import { PurpleButton } from "../../components/Button";
import useForm from "react-hook-form";
import { useLoginMutation, MeDocument } from "../../generated/graphql";
import { setAccessToken } from "../../accessToken";
import { RouteComponentProps } from "react-router-dom";
import AuthWrapper from "../../components/AuthWrapper";
import { GraphqlErrors, FormErrors } from "../../components/HandleErrors";

interface TParams {
  history: string | undefined;
}

export const Login = React.memo(({ history }: RouteComponentProps<TParams>) => {
  const [login, { error }] = useLoginMutation();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async ({ email, password }: Record<string, any>) => {
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

      history.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthWrapper>
        <div style={{ width: "100%" }}>
          <PageHeader>
            Join others creating ecommerce platforms for software
          </PageHeader>
          <PageDescription style={{ marginTop: 20 }}>
            Lorem ipsum dolor sit amet, consectetur cesing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim.
          </PageDescription>
        </div>
        <div style={{ width: "100%" }}>
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
          <GraphqlErrors error={error} />
        </div>
        <PurpleButton type="submit">Login to your account</PurpleButton>
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
    </form>
  );
});

export default Login;
