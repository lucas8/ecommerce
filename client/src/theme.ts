import { ThemeProps } from "styled-components";

const theme = {
  mobile: "922px",
  shadow: "0 2px 8px 0 rgba(225,225,225,0.50)",
  bg: {
    default: "#F0F4F9",
    secondary: "#1E86FF",
    alt: "#BBDBFF",
    border: "#E0E5E9",
    hoverBlue: "#1774E1"
  },
  text: {
    default: "#303446",
    secondary: "#8F9CB2",
    danger: "#F25C54"
  },
  fonts: {
    header: "'Montserrat', sans-serif",
    body: "'Open Sans', sans-serif"
  }
};

export type ThemeType = typeof theme;

export type StyledThemeType = ThemeProps<ThemeType>;

export default theme;
