import React, { ReactNode, useState } from "react";
import { MobileTopBarButton } from "./style";
import { ReactComponent as Menu } from "../../static/svg/menu.svg";

interface MobileMenuProps {
  children?: ReactNode;
}

const MobileMenu = ({ children }: MobileMenuProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <MobileTopBarButton>
      <Menu />
    </MobileTopBarButton>
  );
};

export default MobileMenu;
