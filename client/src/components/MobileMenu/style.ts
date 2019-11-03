import styled from "styled-components";
import { StyledThemeType } from "../../theme";

export const StyledMenu = styled.nav`
  display: flex;
  box-shadow: ${({ theme }: StyledThemeType) => theme.shadow};
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  transition: all 150ms ease;
`;

export const MobileMenuHeader = styled.h4`
  color: ${({ theme }: StyledThemeType) => theme.text.default};
  font-weight: bold;
  text-transform: uppercase;
`;

export const Divider = styled.hr`
  height: 1px;
  color: ${({ theme }: StyledThemeType) => theme.bg.border};
  background-color: ${({ theme }: StyledThemeType) => theme.bg.border};
  border: none;
  margin: 8px 0;
`;
