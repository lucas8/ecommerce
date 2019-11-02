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
        font-family: -apple-system, BlinkMacSystemFont, "Open Sans", "Montserrat",
            "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        background: ${({ theme }: StyledThemeType) => theme.bg.default};
        color: ${({ theme }: StyledThemeType) => theme.text.default};
        text-rendering: optimizeLegibility;
    }
`;
