import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
  useMemo
} from "react";
import { User, useMeQuery, useLoginMutation } from "../generated/graphql";
import { loginUser } from "../api";

type MeState = {
  isLoading: boolean;
  isAuthed: boolean;
  me?: User;
};

type MeActions = {
  login(email: string, password: string): Promise<MeState>;
};

type MeContextValue = {
  state: MeState;
  actions: MeActions;
};

const MeContext = createContext<MeContextValue | undefined>(undefined);

interface MeProps {
  children?: ReactNode;
}

export const MeProvider = ({ children }: MeProps) => {
  const { data, loading } = useMeQuery();
  const [login] = useLoginMutation();

  const [state, setState] = useState<MeState>({
    isLoading: true,
    isAuthed: false
  });

  const actions = useMemo<MeActions>(
    () => ({
      login: async (email: string, password: string) => {
        try {
          const response = await loginUser(login, {
            usernameOrEmail: email,
            password
          });

          if (response && response.data) {
            return {
              isAuthed: true,
              isLoading: false,
              me: response.data.login.user
            };
          }
        } catch (error) {
          return error;
        }
      }
    }),
    [login]
  );

  useEffect(() => {
    if (loading) {
      setState({
        isLoading: true,
        ...state
      });
    } else if (data && data.me) {
      setState({
        isLoading: false,
        isAuthed: !!data.me,
        me: data.me as User
      });
    }
  }, [loading, data]);

  const value = useMemo(
    () => ({
      state,
      actions
    }),
    [state, actions]
  );

  return <MeContext.Provider value={value}>{children}</MeContext.Provider>;
};

export const useMeContext = () => {
  return useContext(MeContext)!;
};
