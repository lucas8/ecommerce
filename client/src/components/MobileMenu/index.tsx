import React from "react";
import { useLayoutContext } from "../../contexts/Layout";
import { StyledMenu, MobileMenuHeader, Divider } from "./style";
import { useSpring, animated as a } from "react-spring";
import { Link } from "../Layout";
import { NavBarLink } from "../Text";

interface MobileMenuProps {
  layout: Link[];
}

const MobileMenu = ({ layout }: MobileMenuProps) => {
  const {
    state: { isMobileOpen }
  } = useLayoutContext();

  const props = useSpring({
    opacity: isMobileOpen ? 1 : 0,
    height: isMobileOpen ? "auto" : 0,
    transform: isMobileOpen ? "scale(1)" : "scale(0)",
    marginTop: isMobileOpen ? "15px" : "0px",
    marginBottom: isMobileOpen ? "15px" : "0px"
  });

  return (
    <a.div style={props}>
      <StyledMenu>
        <MobileMenuHeader>account</MobileMenuHeader>
        <Divider />
        {layout.map((link, i) => {
          return (
            <NavBarLink key={i} to={link.href} style={{ marginLeft: 0 }}>
              {link.name}
            </NavBarLink>
          );
        })}
      </StyledMenu>
    </a.div>
  );
};

export default MobileMenu;
