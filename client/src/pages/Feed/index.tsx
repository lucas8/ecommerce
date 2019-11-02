import React from "react";
import { usePostsContext } from "../../contexts/Posts";

const Feed = () => {
  const { posts } = usePostsContext();

  return (
    <div>
      {posts.map(post => {
        return <div key={post.id}>{post.name}</div>;
      })}
    </div>
  );
};

export default Feed;
