import React from "react";
import { GraphQLError } from "graphql";
import { ApolloError } from "apollo-client";
import { ResponseField } from "./Text";

interface Props {
  error: ApolloError | undefined;
}

export const GraphqlErrors = React.memo(({ error }: Props) => {
  return (
    <React.Fragment>
      {error &&
        error.graphQLErrors.map((x: GraphQLError, i: number) => {
          return (
            <ResponseField style={{ marginTop: 10 }} key={i} flavor="danger">
              {}
            </ResponseField>
          );
        })}
    </React.Fragment>
  );
});

export const FormErrors = ({ message }: { message: string }) => {
  return (
    <ResponseField style={{ marginTop: 10 }} flavor="danger">
      {message}
    </ResponseField>
  );
};
