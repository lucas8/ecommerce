import styled from "styled-components";
import { StyledThemeType } from "../../theme";

export const StyledMenu = styled.nav<{ open: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
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
  color: ${({ theme }: StyledThemeType) => theme.text.secondary}20;
  background-color: ${({ theme }: StyledThemeType) => theme.text.secondary}20;
  border: none;
  margin: 8px 0;
`;
