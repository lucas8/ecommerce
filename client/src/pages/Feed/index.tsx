import React from "react";
import Layout from "../../components/Layout";
import { TitleText, DescriptionText } from "../../components/Typography";
import { StyledButton } from "../../components/Button";
import { ReactComponent as Plus } from "../../static/svg/plus.svg";
import { FeedHeadContainer, FeaturedPosts } from "./style";
import { BigCard } from "../../components/Cards";
import { usePostsContext } from "../../contexts/Posts";

const Feed = () => {
  const { posts } = usePostsContext();

  return (
    <Layout title="Feed">
      <FeedHeadContainer>
        <div>
          <TitleText>Your Feed</TitleText>
          <DescriptionText style={{ margin: "15px 0" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </DescriptionText>
        </div>
        <StyledButton>
          New Post
          <Plus className="icon" />
        </StyledButton>
      </FeedHeadContainer>
      <FeaturedPosts>
        {posts.map(post => {
          return <BigCard post={post} key={post.id} />;
        })}
      </FeaturedPosts>
    </Layout>
  );
};

export default Feed;
