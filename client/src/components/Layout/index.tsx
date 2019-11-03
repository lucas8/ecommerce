import React, { ReactNode, Fragment } from "react";
import { Helmet } from "react-helmet";
import Topbar from "../Topbar";
import styled from "styled-components";
import MobileMenu from "../MobileMenu";

const topBarLayout = [
  {
    name: "Feed",
    href: "/feed"
  },
  {
    name: "Messages",
    href: "/messages"
  },
  {
    name: "Account",
    href: "/account"
  }
];

export type Link = {
  name: string;
  href: string;
};

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <Fragment>
      <Helmet>
        {/* Fallback to title declared in index.html */}
        {title && <title>Ecommerce &#8212; {title}</title>}
      </Helmet>
      <Content>
        <Topbar layout={topBarLayout} />
        <MobileMenu layout={topBarLayout} />
        {children}
      </Content>
    </Fragment>
  );
};

export default Layout;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 5%;
`;
