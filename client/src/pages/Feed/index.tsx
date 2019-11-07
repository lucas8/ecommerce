import React, { Fragment } from "react";
import Layout from "../../components/Layout";
import { TitleText, DescriptionText } from "../../components/Typography";
import { StyledButton } from "../../components/Button";
import { ReactComponent as Plus } from "../../static/svg/plus.svg";
import { FeedHeadContainer, FeaturedPosts } from "./style";
import { BigCard, SkeletonCard } from "../../components/Cards";
import { usePostsContext } from "../../contexts/Posts";
import { ProfilesClip } from "../../components/ProfilesChip";

const Feed = () => {
  const { posts, isLoading } = usePostsContext();

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
        {isLoading ? (
          <SkeletonCards />
        ) : (
          posts.map(post => {
            return <BigCard post={post} key={post.id} />;
          })
        )}
      </FeaturedPosts>
    </Layout>
  );
};

export default Feed;

const SkeletonCards = () => {
  return (
    <Fragment>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </Fragment>
  );
};
