import React, { useState, useEffect } from "react";
import { Routes } from "./Routes";
import APIProvider from "./contexts/API";
import { ThemeProvider } from "styled-components";
import theme, { ThemeType } from "./theme";
import { GlobalStyles } from "./global";
import { setAccessToken } from "./accessToken";
import { baseUrl } from "./index";

interface Props {}

// Note: ThemeProvider returns its children when rendering, so only one node
const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}refresh_token`, {
      method: "POST",
      credentials: "include"
    }).then(async x => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <ThemeProvider theme={theme as ThemeType}>
      <>
        <GlobalStyles />
        <APIProvider>
          <Routes />
        </APIProvider>
      </>
    </ThemeProvider>
  );
};

export default App;
