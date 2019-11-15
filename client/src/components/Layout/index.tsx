import React, { ReactNode, Fragment } from "react";
import { Helmet } from "react-helmet";
import Topbar from "../Topbar";
import styled from "styled-components";
import MobileMenu from "../MobileMenu";
import { useMeContext } from "../../contexts/Me";

export type Link = {
  name: string;
  href: string;
};

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const {
    state: { me }
  } = useMeContext();

  const topBarLayout = [
    {
      name: "Feed",
      href: "/"
    },
    {
      name: "Messages",
      href: "/messages"
    },
    {
      name: "Account",
      // Fallback to feed if user is not fetched yet
      href: me ? `/@${me.username}` : "/"
    }
  ];

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
