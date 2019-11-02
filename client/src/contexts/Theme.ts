import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { ThemeType } from "../theme";

export const useThemeContext = () => {
  return useContext(ThemeContext) as ThemeType;
};
