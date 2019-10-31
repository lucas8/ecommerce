import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState
} from "react";

type AuthState = {
  usernameOrEmail: string;
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
  const [state, setState] = useState<AuthState>({
    usernameOrEmail: "",
    password: ""
  });
  const actions = useMemo(
    () => ({
      setAuthState: ({ usernameOrEmail, password }: AuthState) => {
        setState({ usernameOrEmail, password });
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
