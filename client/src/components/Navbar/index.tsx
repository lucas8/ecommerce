import React from "react";
import { NavbarContainer } from "./style";
import { useMeContext } from "../../contexts/Me";

const Navbar = () => {
  const { user } = useMeContext();

  return <NavbarContainer>{user.username}</NavbarContainer>;
};

export default Navbar;
