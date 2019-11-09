import React, { Fragment, useState } from "react";
import Layout from "../../components/Layout";
import { TitleText, DescriptionText } from "../../components/Typography";
import Button from "../../components/Button";
import { ReactComponent as Plus } from "../../static/svg/plus.svg";
import { FeedHeadContainer, FeaturedPosts } from "./style";
import { BigCard, SkeletonCard } from "../../components/Cards";
import { usePostsContext } from "../../contexts/Posts";
import Modal from "../../components/Modal";

const Feed = () => {
  const { posts, isLoading } = usePostsContext();
  const [isOpen, setOpen] = useState(false);

  return (
    <Fragment>
      <Modal title="Purchase" isOpen={isOpen} setOpen={setOpen}>
        testing123
      </Modal>
      <Layout title="Feed">
        <FeedHeadContainer>
          <div>
            <TitleText>Your Feed</TitleText>
            <DescriptionText style={{ margin: "15px 0" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </DescriptionText>
          </div>
          <Button>
            New Post
            <Plus className="icon" />
          </Button>
        </FeedHeadContainer>
        <FeaturedPosts>
          {isLoading ? (
            <SkeletonCards />
          ) : (
            posts.map(post => {
              return (
                <BigCard
                  post={post}
                  key={post.id}
                  onClick={() => setOpen(true)}
                />
              );
            })
          )}
        </FeaturedPosts>
      </Layout>
    </Fragment>
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
