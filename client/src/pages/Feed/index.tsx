import React from "react";
import { usePostsContext } from "../../contexts/Posts";
import Layout from "../../components/Layout";

const Feed = () => {
  const { posts } = usePostsContext();

  return (
    <Layout title="Feed">
      <div>
        {posts.map(post => {
          return <div key={post.id}>{post.name}</div>;
        })}
      </div>
    </Layout>
  );
};

export default Feed;
