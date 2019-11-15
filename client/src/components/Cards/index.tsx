import React from "react";
import {
  CardContainer,
  CardImage,
  CardContentContainer,
  CardTitle,
  SkeletonContainer,
  SkeletonContent
} from "./style";
import { BodyText } from "../Typography";
import { Post } from "../../generated/graphql";

type BigCardProps = any & {
  post: Post;
};

export const BigCard = ({ post, ...rest }: BigCardProps) => {
  const { name, imageUrl, description } = post;

  return (
    <CardContainer flavor="LARGE" {...rest} purchased={post.isPurchased}>
      <CardImage alt={name} draggable={false} src={imageUrl} />
      <CardContentContainer>
        <CardTitle style={{ marginBottom: 5 }}>{name}</CardTitle>
        <BodyText>{description}</BodyText>
      </CardContentContainer>
    </CardContainer>
  );
};

export const SkeletonCard = () => {
  return (
    <SkeletonContainer>
      <SkeletonContent width={250} height={30} />
      <SkeletonContent width={315} height={15} />
    </SkeletonContainer>
  );
};
