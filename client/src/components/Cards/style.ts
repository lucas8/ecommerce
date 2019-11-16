import styled, { css } from "styled-components";
import { BodyTitleText } from "../Typography";
import { StyledThemeType } from "../../theme";

interface CardContainerProps {
  flavor: "LARGE" | "SMALL";
  purchased: boolean;
}

export const CardContainer = styled.div<CardContainerProps>`
  height: ${({ flavor }: CardContainerProps) =>
    flavor === "LARGE" ? "330px" : "130px"};
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(225,225,225,0.50);
  opacity: ${({ purchased }) => (purchased ? ".5" : "1")};

  ${({ flavor }: CardContainerProps) =>
    flavor === "LARGE" &&
    css`
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
    `}

 @media (max-width: ${({ theme }: StyledThemeType) => theme.mobile}) {
    flex: 1 21%;
  }
`;

export const CardImage = styled.img`
  object-fit: cover;
  min-height: 215px;
`;

export const CardContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  padding: 0 20px;
`;

export const CardTitle = styled(BodyTitleText)`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const SkeletonContainer = styled.div`
  height: 300px;
  background: white;
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 20px;
`;

type SkeletonContent = {
  width: number;
  height: number;
};

export const SkeletonContent = styled.div<SkeletonContent>`
  width: 100%;
  max-width: ${props => props.width}px;
  height: ${props => props.height}px;
  height: 30px;
  background: red;
  border-radius: 6px;

  animation: pulse 2s ease-in-out infinite;

  :first-child {
    margin-bottom: 10px;
  }

  @keyframes pulse {
    0% {
      background: #f7f7f7;
    }
    50% {
      background: #efefef;
    }
    100% {
      background: #f7f7f7;
    }
  }
`;
