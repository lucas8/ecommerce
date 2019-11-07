import React, { ReactNode } from "react";
import { StyledButton } from "./style";
import { Loader } from "../Loader";

type ButtonProps = any & {
  children?: ReactNode;
  isLoading: boolean;
};

const Button = ({ children, isLoading = false, ...rest }: ButtonProps) => {
  return (
    <StyledButton {...rest} isLoading={isLoading}>
      {isLoading && <Loader style={{ marginRight: 8 }} />}
      {children}
    </StyledButton>
  );
};

export default Button;
