import React, { ReactNode, useContext } from "react";
import { TopbarContainer, TopbarLink } from "./style";
import { ReactComponent as Logo } from "../../static/svg/logo.svg";
import useMedia from "../../hooks/useMedia";
import MobileMenu from "../MobileMenu";
import { useThemeContext } from "../../contexts/Theme";

type Link = {
  name: string;
  href: string;
};

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
    showTopbarMobile ? (
      <MobileMenu>{children}</MobileMenu>
    ) : (
      <div>{children}</div>
    );

  return (
    <TopbarContainer>
      <Logo />
      <LinkContainer>
        {layout.map((link, i) => {
          return (
            <TopbarLink key={i} to={link.href}>
              {link.name}
            </TopbarLink>
          );
        })}
      </LinkContainer>
    </TopbarContainer>
  );
};

export default Topbar;
