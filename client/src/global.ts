import { createGlobalStyle, DefaultTheme } from "styled-components";
import theme from "./theme";

export const GlobalStyles = createGlobalStyle`
    *,
    html,
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, "Open Sans", "Montserrat",
            "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        background: ${theme.bg.default};
        color: ${theme.text.default};
        text-rendering: optimizeLegibility;
    }
`;
