import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { ThemeType } from "../theme";

type StatusTextProps = any & {
  success: boolean;
  children?: ReactNode;
};

const StatusText = ({ success, children, ...rest }: StatusTextProps) => {
  const [text, setText] = useState(children);

  setTimeout(() => setText(""), 5000);

  return (
    <StyledStatusText {...rest} success={success}>
      {text}
    </StyledStatusText>
  );
};

export default StatusText;

export const StyledStatusText = styled.p<StatusTextProps>`
  font-weight: 600;
  font-size: 14px;
  color: ${({ success, theme }: { success: boolean; theme: ThemeType }) =>
    success ? theme.text.success : theme.text.danger};
`;
