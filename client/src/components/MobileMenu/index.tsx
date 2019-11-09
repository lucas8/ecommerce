import React from "react";
import { useLayoutContext } from "../../contexts/Layout";
import { StyledMenu, MobileMenuHeader, Divider } from "./style";
import { useSpring, animated as a } from "react-spring";
import { Link } from "../Layout";
import { NavBarLink } from "../Link";

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
    transform: isMobileOpen ? "translateY(-5px)" : "translateY(0)",
    marginTop: isMobileOpen ? "15px" : "0px",
    marginBottom: isMobileOpen ? "15px" : "0px",
    config: {
      duration: 150
    }
  });

  return (
    <a.div style={props}>
      <StyledMenu open={isMobileOpen}>
        <MobileMenuHeader>account</MobileMenuHeader>
        <Divider />
        {layout.map((link, i) => {
          return (
            <NavBarLink
              key={i}
              to={link.href}
              style={{ marginLeft: 0 }}
              aria-label={link.name.toLowerCase()}
            >
              {link.name}
            </NavBarLink>
          );
        })}
      </StyledMenu>
    </a.div>
  );
};

export default MobileMenu;
