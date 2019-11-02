import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

export const useThemeContext = () => {
  return useContext(ThemeContext)!;
};
