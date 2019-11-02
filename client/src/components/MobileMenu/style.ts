import styled from "styled-components";
import theme from "../../theme";

export const MobileTopBarButton = styled.button`
  outline: none;
  border: none;
  background: ${theme.bg.alt};
  padding: 6px;
  border-radius: 6px;
  transition: all ease 150ms;

  :active {
    opacity: 0.5;
  }
`;
