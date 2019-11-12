import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
  useMemo
} from "react";
import { User, useMeQuery, useLoginMutation } from "../generated/graphql";
import { loginUser, LoginType } from "../api";
import { ApolloError } from "apollo-client";

type MeState = {
  isLoading: boolean;
  isAuthed: boolean;
  me?: User;
};

type LoginResponse = {
  me?: MeState;
  error?: ApolloError;
};

type MeActions = {
  login(email: string, password: string): Promise<LoginResponse>;
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
        const { response, error }: LoginType = await loginUser(login, {
          usernameOrEmail: email,
          password
        });

        return {
          me: {
            // We only want say the user is authed when it has an access token
            isAuthed:
              response && response.data && response.data.login.token
                ? true
                : false,
            isLoading: false,
            me: response && response.data && (response.data.login.user as User)
          },
          error
        };
      }
    }),
    [login]
  );

  useEffect(() => {
    if (loading) {
      setState({
        isLoading: true,
        isAuthed: false
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
