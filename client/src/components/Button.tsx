import styled from "styled-components";
import theme from "../theme";

const Button = styled.button`
  outline: none;
  border: none;
  width: 100%;
  height: 70px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  font-size: 19px;
  transition: all ease 150ms;
`;

export const PurpleButton = styled(Button)`
  background: ${theme.bg.alt};
  color: white;

  :hover {
    background: #3b4ecd;
  }

  :active {
    background: #2939a3;
  }
`;
