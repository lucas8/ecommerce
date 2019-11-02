import React from "react";
import { Post as SingularPost } from "../../generated/graphql";
import {
  PostContainer,
  PostHeader,
  PostContent,
  PostImage,
  PostHeadContent
} from "./style";
import { HeadText, SubHeaderText, Bold, Paragraph } from "../Text";
import { WhiteButton } from "../Button";

interface PostProps {
  post: SingularPost;
}

const Post = ({ post }: PostProps) => {
  const { owner, name, price, imageUrl, description } = post;
  const { username } = owner;

  return (
    <PostContainer>
      <PostHeader>
        <PostHeadContent>
          <HeadText>{username}</HeadText>
          <SubHeaderText>{name}</SubHeaderText>
        </PostHeadContent>
        <WhiteButton>Purchase &ndash; ${price}</WhiteButton>
      </PostHeader>
      <PostContent>
        <PostImage src={imageUrl} alt={name} />
        <Paragraph>
          <Bold>{username} </Bold>
          {description}
        </Paragraph>
      </PostContent>
    </PostContainer>
  );
};

export default Post;
