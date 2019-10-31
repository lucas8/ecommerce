import React, { useState, useEffect } from "react";
import { Routes } from "./Routes";
import { setAccessToken } from "./accessToken";
import APIProvider from "./contexts/API";

interface Props {}

const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
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
    <APIProvider>
      <Routes />
    </APIProvider>
  );
};

export default App;
