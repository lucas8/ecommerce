import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
  useMemo
} from "react";
import {
  usePostsQuery,
  Post,
  PostsQuery,
  PostsQueryVariables
} from "../generated/graphql";
import { ApolloQueryResult } from "apollo-client";

type PostsState = {
  isLoading: boolean;
  posts: Post[];
  refetch?(
    variables?: PostsQueryVariables | undefined
  ): Promise<ApolloQueryResult<PostsQuery>>;
};

interface PostsProps {
  children?: ReactNode;
}

const PostsContext = createContext<PostsState | undefined>(undefined);

export const PostsProvider = ({ children }: PostsProps) => {
  const { data, loading, refetch: refetchPosts } = usePostsQuery();

  const [state, setState] = useState<PostsState>({
    isLoading: true,
    posts: []
  });

  useEffect(() => {
    if (loading) {
      setState({
        isLoading: true,
        posts: []
      });
    } else if (data && data.posts) {
      setState({
        isLoading: false,
        posts: data.posts as Post[]
      });
    }
  }, [loading, data]);

  const value = useMemo(
    () => ({
      ...state,
      refetch: refetchPosts
    }),
    [state, refetchPosts]
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(PostsContext)!;
};
