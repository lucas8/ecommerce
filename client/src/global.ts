import { createGlobalStyle } from "styled-components";
import { StyledThemeType } from "./theme";

export const GlobalStyles = createGlobalStyle`
    *,
    html,
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: ${({ theme }: StyledThemeType) =>
          theme.fonts.body} !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        background: ${({ theme }: StyledThemeType) => theme.bg.default};
        color: ${({ theme }: StyledThemeType) => theme.text.default};
        text-rendering: optimizeLegibility;
    }

    b {
        font-weight: bold !important;
    }
`;
