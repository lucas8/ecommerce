import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  useMemo,
  useState
} from "react";
import { LoginArgs } from "../types";

type AuthState = {
  email: string;
  password: string;
};

type AuthActions = {
  setAuthState(data: AuthState): void;
};

type AuthContextValue = {
  state: AuthState;
  actions: AuthActions;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProps {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: AuthProps) => {
  const [state, setState] = useState<AuthState>({ email: "", password: "" });
  const actions = useMemo(
    () => ({
      setAuthState: ({ email, password }: AuthState) => {
        setState({ email, password });
      }
    }),
    []
  );

  // Memorize the state and dispatch so it will only call when the value gets changed
  const value = useMemo(
    () => ({
      state,
      actions
    }),
    [state, actions]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext)!;
};
