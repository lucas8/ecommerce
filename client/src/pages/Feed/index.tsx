import React from "react";
import { usePostsContext } from "../../contexts/Posts";

const Feed = () => {
  const { posts, isLoading } = usePostsContext();
  console.log(isLoading);
  if (!isLoading) {
    console.log(posts);
  }
  return <div>feed</div>;
};

export default Feed;
