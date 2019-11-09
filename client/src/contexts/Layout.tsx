import React, { createContext, useContext, useMemo, useState } from "react";

type LayoutState = {
  isMobileOpen: boolean;
};

type LayoutActions = {
  setIsMobileOpen(val: boolean): void;
};

type LayoutContextValue = {
  state: LayoutState;
  actions: LayoutActions;
};

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

type ProviderProps = {
  children?: React.ReactNode;
};

export const LayoutProvider = ({ children }: ProviderProps) => {
  const [state, setState] = useState<LayoutState>({ isMobileOpen: false });
  const actions = useMemo<LayoutActions>(
    () => ({
      setIsMobileOpen: isMobileOpen => {
        setState({ isMobileOpen });
      }
    }),
    []
  );

  const value = useMemo(
    () => ({
      state,
      actions
    }),
    [state, actions]
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  return useContext(LayoutContext)!;
};
