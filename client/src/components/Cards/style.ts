import styled, { css } from "styled-components";
import { BodyTitleText } from "../Typography";
import { StyledThemeType } from "../../theme";

interface CardContainerProps {
  flavor: "LARGE" | "SMALL";
}

export const CardContainer = styled.div<CardContainerProps>`
  min-width: ${({ flavor }: CardContainerProps) =>
    flavor == "LARGE" ? "400px" : "370px"};
  height: ${({ flavor }: CardContainerProps) =>
    flavor == "LARGE" ? "300px" : "130px"};
  border-radius: 6px;
  background: #fff;
  overflow: hidden;


  ${({ flavor }: CardContainerProps) =>
    flavor == "LARGE" &&
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
