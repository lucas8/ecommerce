import styled from "styled-components";
import { StyledThemeType } from "../../theme";

export const FeedHeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 50px;

  @media (max-width: ${({ theme }: StyledThemeType) => theme.mobile}) {
    flex-wrap: wrap;
  }
`;

export const FeaturedPosts = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 1rem;
`;
