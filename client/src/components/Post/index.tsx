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
  return (
    <PostContainer>
      <PostHeader>
        <PostHeadContent>
          <HeadText>{post.owner.username}</HeadText>
          <SubHeaderText>{post.name}</SubHeaderText>
        </PostHeadContent>
        <WhiteButton>Purchase &ndash; ${post.price}</WhiteButton>
      </PostHeader>
      <PostContent>
        <PostImage src={post.imageUrl} alt={post.name} />
        <Paragraph>
          <Bold>{post.owner.username} </Bold>
          {post.description}
        </Paragraph>
      </PostContent>
    </PostContainer>
  );
};

export default Post;
