import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AuthResponse = {
   __typename?: 'AuthResponse',
  user: User,
  token: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  confirmEmail?: Maybe<Scalars['Boolean']>,
  sendForgotPasswordEmail?: Maybe<Scalars['Boolean']>,
  forgotPasswordChange?: Maybe<Scalars['Boolean']>,
  login: AuthResponse,
  checkTwoFactor: Scalars['Boolean'],
  logout: Scalars['Boolean'],
  signup?: Maybe<Scalars['Boolean']>,
  newPost: Post,
  purchase: Scalars['String'],
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String']
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String']
};


export type MutationForgotPasswordChangeArgs = {
  newPassword: Scalars['String'],
  token: Scalars['String']
};


export type MutationLoginArgs = {
  usernameOrEmail: Scalars['String'],
  password: Scalars['String'],
  token?: Maybe<Scalars['String']>
};


export type MutationCheckTwoFactorArgs = {
  usernameOrEmail: Scalars['String'],
  password: Scalars['String']
};


export type MutationSignupArgs = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  hasTwoFactor?: Maybe<Scalars['Boolean']>,
  username: Scalars['String']
};


export type MutationNewPostArgs = {
  name: Scalars['String'],
  imageUrl: Scalars['String'],
  price: Scalars['Float'],
  description: Scalars['String']
};


export type MutationPurchaseArgs = {
  postId: Scalars['ID']
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  name: Scalars['String'],
  imageUrl: Scalars['String'],
  price: Scalars['Float'],
  description: Scalars['String'],
  owner: User,
  isPurchased: Scalars['Boolean'],
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  posts: Array<Maybe<Post>>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  hasTwoFactor: Scalars['Boolean'],
  posts: Array<Maybe<Post>>,
};

export type ForgotPasswordChangeMutationVariables = {
  newPassword: Scalars['String'],
  token: Scalars['String']
};


export type ForgotPasswordChangeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPasswordChange'>
);

export type CheckTwoFactorMutationVariables = {
  usernameOrEmail: Scalars['String'],
  password: Scalars['String']
};


export type CheckTwoFactorMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'checkTwoFactor'>
);

export type SendForgotPasswordEmailMutationVariables = {
  email: Scalars['String']
};


export type SendForgotPasswordEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendForgotPasswordEmail'>
);

export type LoginMutationVariables = {
  usernameOrEmail: Scalars['String'],
  password: Scalars['String'],
  token?: Maybe<Scalars['String']>
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'firstName' | 'lastName' | 'email' | 'hasTwoFactor'>
    ) }
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'firstName' | 'lastName' | 'email' | 'hasTwoFactor'>
  )> }
);

export type PurchaseMutationVariables = {
  postId: Scalars['ID']
};


export type PurchaseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'purchase'>
);

export type PostsQueryVariables = {};


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'name' | 'imageUrl' | 'price' | 'description' | 'isPurchased'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )>> }
);


export const ForgotPasswordChangeDocument = gql`
    mutation ForgotPasswordChange($newPassword: String!, $token: String!) {
  forgotPasswordChange(newPassword: $newPassword, token: $token)
}
    `;
export type ForgotPasswordChangeMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordChangeMutation, ForgotPasswordChangeMutationVariables>;

    export function useForgotPasswordChangeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordChangeMutation, ForgotPasswordChangeMutationVariables>) {
      return ApolloReactHooks.useMutation<ForgotPasswordChangeMutation, ForgotPasswordChangeMutationVariables>(ForgotPasswordChangeDocument, baseOptions);
    }
export type ForgotPasswordChangeMutationHookResult = ReturnType<typeof useForgotPasswordChangeMutation>;
export type ForgotPasswordChangeMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordChangeMutation>;
export type ForgotPasswordChangeMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordChangeMutation, ForgotPasswordChangeMutationVariables>;
export const CheckTwoFactorDocument = gql`
    mutation CheckTwoFactor($usernameOrEmail: String!, $password: String!) {
  checkTwoFactor(usernameOrEmail: $usernameOrEmail, password: $password)
}
    `;
export type CheckTwoFactorMutationFn = ApolloReactCommon.MutationFunction<CheckTwoFactorMutation, CheckTwoFactorMutationVariables>;

    export function useCheckTwoFactorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CheckTwoFactorMutation, CheckTwoFactorMutationVariables>) {
      return ApolloReactHooks.useMutation<CheckTwoFactorMutation, CheckTwoFactorMutationVariables>(CheckTwoFactorDocument, baseOptions);
    }
export type CheckTwoFactorMutationHookResult = ReturnType<typeof useCheckTwoFactorMutation>;
export type CheckTwoFactorMutationResult = ApolloReactCommon.MutationResult<CheckTwoFactorMutation>;
export type CheckTwoFactorMutationOptions = ApolloReactCommon.BaseMutationOptions<CheckTwoFactorMutation, CheckTwoFactorMutationVariables>;
export const SendForgotPasswordEmailDocument = gql`
    mutation SendForgotPasswordEmail($email: String!) {
  sendForgotPasswordEmail(email: $email)
}
    `;
export type SendForgotPasswordEmailMutationFn = ApolloReactCommon.MutationFunction<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>;

    export function useSendForgotPasswordEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>) {
      return ApolloReactHooks.useMutation<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>(SendForgotPasswordEmailDocument, baseOptions);
    }
export type SendForgotPasswordEmailMutationHookResult = ReturnType<typeof useSendForgotPasswordEmailMutation>;
export type SendForgotPasswordEmailMutationResult = ApolloReactCommon.MutationResult<SendForgotPasswordEmailMutation>;
export type SendForgotPasswordEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!, $token: String) {
  login(usernameOrEmail: $usernameOrEmail, password: $password, token: $token) {
    user {
      id
      username
      firstName
      lastName
      email
      hasTwoFactor
    }
    token
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

    export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
      return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
    }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    firstName
    lastName
    email
    hasTwoFactor
  }
}
    `;

    export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
      return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
    }
      export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
      
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const PurchaseDocument = gql`
    mutation Purchase($postId: ID!) {
  purchase(postId: $postId)
}
    `;
export type PurchaseMutationFn = ApolloReactCommon.MutationFunction<PurchaseMutation, PurchaseMutationVariables>;

    export function usePurchaseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PurchaseMutation, PurchaseMutationVariables>) {
      return ApolloReactHooks.useMutation<PurchaseMutation, PurchaseMutationVariables>(PurchaseDocument, baseOptions);
    }
export type PurchaseMutationHookResult = ReturnType<typeof usePurchaseMutation>;
export type PurchaseMutationResult = ApolloReactCommon.MutationResult<PurchaseMutation>;
export type PurchaseMutationOptions = ApolloReactCommon.BaseMutationOptions<PurchaseMutation, PurchaseMutationVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    name
    imageUrl
    price
    description
    isPurchased
    owner {
      username
    }
  }
}
    `;

    export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
      return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
    }
      export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
      
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;