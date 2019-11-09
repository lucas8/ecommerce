import styled from "styled-components";
import { StyledThemeType } from "../../theme";

export const HeroText = styled.h1`
  font-family: ${({ theme }: StyledThemeType) => theme.fonts.header};
  color: ${({ theme }: StyledThemeType) => theme.text.default};
  font-weight: 700;
  font-size: 4rem;
`;

export const TitleText = styled.h1`
  font-family: ${({ theme }: StyledThemeType) => theme.fonts.header};
  color: ${({ theme }: StyledThemeType) => theme.text.default};
  font-weight: bold;
  font-size: 2rem;
`;

export const DescriptionText = styled.div`
  font-family: ${({ theme }: StyledThemeType) => theme.fonts.body};
  color: ${({ theme }: StyledThemeType) => theme.text.secondary};
  font-size: 1.2rem;
`;

export const BodyTitleText = styled.h3`
  font-family: ${({ theme }: StyledThemeType) => theme.fonts.body};
  color: ${({ theme }: StyledThemeType) => theme.text.default};
  font-size: 1.2rem;
  font-weight: 600;
`;

export const BodyText = styled.p`
  font-family: ${({ theme }: StyledThemeType) => theme.fonts.body};
  color: ${({ theme }: StyledThemeType) => theme.text.secondary};
  font-size: 1rem;
`;
