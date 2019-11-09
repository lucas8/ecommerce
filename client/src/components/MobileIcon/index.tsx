import React from "react";
import { StyledMenuIcon, MenuWrapper } from "./style";
import { useLayoutContext } from "../../contexts/Layout";

const MobileIcon = () => {
  const {
    actions: { setIsMobileOpen },
    state: { isMobileOpen }
  } = useLayoutContext();

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

export default MobileIcon;
