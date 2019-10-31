import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
  useMemo
} from "react";
import { usePostsQuery, Post } from "../generated/graphql";

type PostsState = {
  isLoading: boolean;
  posts?: Post[];
};

interface PostsProps {
  children?: ReactNode;
}

const PostsContext = createContext<PostsState | undefined>(undefined);

export const PostsProvider = ({ children }: PostsProps) => {
  const { data, loading } = usePostsQuery();

  const [state, setState] = useState<PostsState>({
    isLoading: true
  });

  useEffect(() => {
    if (loading) {
      setState({
        isLoading: true
      });
    } else if (data && data.posts) {
      setState({
        isLoading: false,
        posts: data.posts as Post[]
      });
    }
  }, [loading]);

  const value = useMemo(
    () => ({
      ...state
    }),
    [state]
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(PostsContext)!;
};
