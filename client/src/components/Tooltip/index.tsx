import React from "react";
import { StyledReactTooltip } from "./style";

export const Tooltip = () => {
  return (
    <StyledReactTooltip
      effect="solid"
      html={true}
      className="customeTheme"
      wrapper="div"
      place="bottom"
    />
  );
};
