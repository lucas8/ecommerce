import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../../theme";

export const TopbarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopbarLink = styled(Link)`
  font-size: 16px;
  color: ${theme.text.secondary};
  margin-left: 35px;
  text-decoration: none;
  transition: all ease-in-out 150ms;
  padding: 6px;
  border-radius: 6px;
  :hover {
    background: ${theme.bg.border};
  }
`;
