import React from "react";
import { Routes } from "./Routes";
import APIProvider from "./contexts/API";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <APIProvider>
      <Routes />
    </APIProvider>
  );
};

export default App;
