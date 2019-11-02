import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Feed from "./pages/Feed";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/feed" component={Feed} />
      </Switch>
    </BrowserRouter>
  );
};
