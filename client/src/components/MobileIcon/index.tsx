import React, { ReactNode } from "react";
import { StyledMenuIcon, MenuWrapper } from "./style";
import { useLayoutContext } from "../../contexts/Layout";

interface MobileMenuProps {
  children?: ReactNode;
}

const MobileMenu = ({ children }: MobileMenuProps) => {
  const { actions, state } = useLayoutContext();
  const { setIsMobileOpen } = actions;
  const { isMobileOpen } = state;

  return (
    <MenuWrapper open={isMobileOpen}>
      <StyledMenuIcon
        open={isMobileOpen}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <div />
        <div />
        <div />
        <div />
      </StyledMenuIcon>
    </MenuWrapper>
  );
};

export default MobileMenu;
