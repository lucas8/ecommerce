import React, { createContext, useContext, ReactNode, Dispatch } from "react";
import { LoginArgs } from "../types";

type ReducerActions = {
  type: "LOGIN";
  payload: LoginArgs;
};

type ContextType = {
  state: LoginArgs;
  dispatch: Dispatch<ReducerActions>;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

const initialState = {
  email: "",
  password: ""
};

const reducer = (state: LoginArgs, action: ReducerActions) => {
  switch (action.type) {
    case "LOGIN":
      return {
        email: action.payload.email,
        password: action.payload.password
      };
  }
};

interface AuthArgs {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthArgs) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext)!;
};
