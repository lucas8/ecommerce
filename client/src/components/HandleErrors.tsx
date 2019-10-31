import React from "react";
import { GraphQLError } from "graphql";
import { ApolloError } from "apollo-client";
import { Danger } from "./Text";

interface Props {
  error: ApolloError | undefined;
}

export const GraphqlErrors = React.memo(({ error }: Props) => {
  return (
    <React.Fragment>
      {error &&
        error.graphQLErrors.map((x: GraphQLError, i: number) => {
          return (
            <Danger style={{ marginTop: 10 }} key={i}>
              {x.message}
            </Danger>
          );
        })}
    </React.Fragment>
  );
});

export const FormErrors = ({ message }: { message: string }) => {
  return <Danger style={{ marginTop: 10 }}>{message}</Danger>;
};
