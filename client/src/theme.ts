import { ThemeProps } from "styled-components";

const theme = {
  mobile: "576px",
  bg: {
    default: "#F0F4F9",
    secondary: "#1E86FF",
    alt: "#BBDBFF",
    border: "#E0E5E9"
  },
  text: {
    default: "#303446",
    secondary: "#8F9CB2"
  }
};

export type ThemeType = typeof theme;

export type StyledThemeType = ThemeProps<ThemeType>;

export default theme;
