import React from "react";
import { Routes } from "./Routes";
import APIProvider from "./contexts/API";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { GlobalStyles } from "./global";

interface Props {}

// Note: ThemeProvider returns its children when rendering, so only one node
const App: React.FC<Props> = () => {
  return (
    <ThemeProvider theme={theme}>
      <APIProvider>
        <GlobalStyles />
        <Routes />
      </APIProvider>
    </ThemeProvider>
  );
};

export default App;
