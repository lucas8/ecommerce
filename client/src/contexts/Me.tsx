import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
  useMemo
} from "react";
import { User, useMeQuery, MeDocument } from "../generated/graphql";

type MeState = {
  isLoading: boolean;
  user: User;
};

interface MeProps {
  children?: ReactNode;
}

const MeContext = createContext<MeState | undefined>(undefined);

export const MeProvider = ({ children }: MeProps) => {
  const { data, loading } = useMeQuery();

  const [state, setState] = useState<MeState>({
    isLoading: true,
    user: MeDocument
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
        user: data.me as User
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
