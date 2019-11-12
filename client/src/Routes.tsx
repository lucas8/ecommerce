import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Home from "./pages/Home";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};
