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

export const ModalHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const ModalImage = styled.img`
  width: 100px;
  height: 60px;
  border-radius: 3px;
`;

export const ModalHeaderTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

// Check mark
export const CheckMarkRowContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
`;
