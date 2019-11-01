import React from "react";
import { usePostsContext } from "../../contexts/Posts";
import { FeedContainer } from "./style";
import Post from "../../components/Post";

const Feed = () => {
  const { posts } = usePostsContext();

  return (
    <FeedContainer>
      {posts.map(post => {
        return <Post post={post} key={post.id} />;
      })}
    </FeedContainer>
  );
};

export default Feed;
