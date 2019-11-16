import styled, { css } from "styled-components";
import { StyledThemeType, ThemeType } from "../../theme";

interface StyledButton {
  flavor?: "LOGIN";
  isLoading: boolean;
}

export const StyledButton = styled.button<StyledButton>`
  font-size: 1.2rem;
  border: none;
  outline: none;
  font-weight: 600;
  color: ${({ isLoading }) => (isLoading ? "#ffffff50" : "#fff")};
  border-radius: 6px;
  padding: 0 20px;
  height: 40px;
  background: ${({
    theme,
    isLoading
  }: {
    theme: ThemeType;
    isLoading: boolean;
  }) => (isLoading ? theme.bg.hoverBlue : theme.bg.secondary)};
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  -webkit-display: none;
  transition: all 0.2s ease-in-out;

  text-transform: uppercase;
  font-weight: bold;
  font-family: ${({ theme }: StyledThemeType) => theme.fonts.body};

  :disabled {
    opacity: 0.5;
    background: #b3b3b3;

    :hover {
      background: #b3b3b3;
    }
  }

  .icon {
    margin-left: 8px;
    opacity: 0.5;
  }

  :hover {
    background: ${({ theme }: StyledThemeType) => theme.bg.hoverBlue};
  }

  :focus {
    box-shadow: 0 0 0 2px ${({ theme }: StyledThemeType) => theme.bg.default},
      0 0 0 4px ${({ theme }: StyledThemeType) => theme.bg.border};
    transition: box-shadow 0.2s ease-in-out;
  }

  :active {
    box-shadow: 0 0 0 2px ${({ theme }: StyledThemeType) => theme.bg.default},
      0 0 0 4px ${({ theme }: StyledThemeType) => theme.text.secondary};
    transition: box-shadow 0.2s ease-in-out;
  }

  @media (max-width: ${({ theme }: StyledThemeType) => theme.mobile}) {
    width: 100%;
  }

  ${({ flavor }) =>
    flavor === "LOGIN" &&
    css`
      width: 100%;
      margin-top: 30px;
    `}
`;
