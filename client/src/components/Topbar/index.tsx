import React, { ReactNode } from "react";
import { TopbarContainer } from "./style";
import { ReactComponent as Logo } from "../../static/svg/logo.svg";
import useMedia from "../../hooks/useMedia";
import MobileIcon from "../MobileIcon";
import { useThemeContext } from "../../contexts/Theme";
import { Link } from "../Layout";
import { NavBarLink } from "../Link";

interface TopbarProps {
  layout: Link[];
}

interface LinkContainerProps {
  children?: ReactNode;
}

const Topbar = ({ layout }: TopbarProps) => {
  const theme = useThemeContext();

  const showTopbarMobile = useMedia(false, [
    `(max-width: ${theme.mobile})`,
    true
  ]);

  const LinkContainer = ({ children }: LinkContainerProps) =>
    showTopbarMobile ? <MobileIcon /> : <div>{children}</div>;

  return (
    <TopbarContainer>
      <Logo />
      <LinkContainer>
        {layout.map((link, i) => {
          return (
            <NavBarLink
              key={i}
              to={link.href}
              aria-label={link.name.toLowerCase()}
            >
              {link.name}
            </NavBarLink>
          );
        })}
      </LinkContainer>
    </TopbarContainer>
  );
};

export default Topbar;
