import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
  useMemo
} from "react";
import { User, useMeQuery } from "../generated/graphql";

type MeState = {
  isLoading: boolean;
  isAuthed: boolean;
  me?: User;
};

interface MeProps {
  children?: ReactNode;
}

const MeContext = createContext<MeState | undefined>(undefined);

export const MeProvider = ({ children }: MeProps) => {
  const { data, loading } = useMeQuery();

  const [state, setState] = useState<MeState>({
    isLoading: true,
    isAuthed: false
  });

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
      ...state
    }),
    [state]
  );

  return <MeContext.Provider value={value}>{children}</MeContext.Provider>;
};

export const useMeContext = () => {
  return useContext(MeContext)!;
};
