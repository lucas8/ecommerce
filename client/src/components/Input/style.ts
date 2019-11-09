import styled, { css } from "styled-components";
import { StyledThemeType, ThemeType } from "../../theme";

interface StyledInputProps {
  hasError?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  border: ${({ theme, hasError }: { theme: ThemeType; hasError?: boolean }) =>
    hasError ? `solid 2px ${theme.text.danger}` : "none"};
  outline: none;
  border-radius: 8px;
  width: 100%;
  padding: 13px 16px;
  transition: all 0.2s linear;
  font-size: 1rem;
  margin-top: 5px;

  ${({ hasError }) =>
    !hasError &&
    css`
      :focus {
        box-shadow: 0 0 0 2px
          ${({ theme }: StyledThemeType) => theme.bg.secondary};
      }
    `}
`;

export const StyledInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledInputLabel = styled.label`
  font-weight: 600;
  font-size: 1rem;
  color: ${({ theme }: StyledThemeType) => theme.text.default};
`;

export const StyledError = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: ${({ theme }: StyledThemeType) => theme.text.danger};
`;
