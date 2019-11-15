import { User } from "../entity/User";
import Stripe = require("stripe");

export interface Context {
  request: any;
  response: any;
  session: any;
  user: User;
  stripe: Stripe;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}

export type GraphQLMiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface Token {
  userId: string;
}
