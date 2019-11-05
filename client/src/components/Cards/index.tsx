import React from "react";
import {
  CardContainer,
  CardImage,
  CardContentContainer,
  CardTitle
} from "./style";
import { BodyText } from "../Typography";
import { Post } from "../../generated/graphql";
import useMedia from "../../hooks/useMedia";

type BigCardProps = any & {
  post: Post;
};

export const BigCard = ({ post, ...rest }: BigCardProps) => {
  const { name, imageUrl, description } = post;

  return (
    <CardContainer flavor="LARGE" {...rest}>
      <CardImage alt={name} draggable={false} src={imageUrl} />
      <CardContentContainer>
        <CardTitle style={{ marginBottom: 5 }}>{name}</CardTitle>
        <BodyText>{description}</BodyText>
      </CardContentContainer>
    </CardContainer>
  );
};
