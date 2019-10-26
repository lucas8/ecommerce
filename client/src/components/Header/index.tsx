import React from "react";
import { PageContainer } from "./style";
import { Helmet } from "react-helmet";

interface Props {
  children: React.ReactNode;
  title: string;
}

const Header = ({ children, title }: Props) => {
  return (
    <PageContainer>
      <Helmet>
        <title>Ecommerce &#8212; {title}</title>
      </Helmet>
      {children}
    </PageContainer>
  );
};

export default Header;
