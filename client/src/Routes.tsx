import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/forgot" component={ForgotPasswordPage} />
          <Route
            exact
            path="/user/change-password"
            component={ChangePassword}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
