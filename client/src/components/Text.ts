import styled from "styled-components";
import theme from "../theme";

export const PageHeader = styled.h3`
  font-weight: bold;
  font-size: 28px;
`;

export const PageDescription = styled.p`
  font-weight: 600;
  font-size: 21px;
  color: ${theme.text.secondary};
`;

export const Danger = styled.p`
  font-weight: 600;
  font-size: 18px;
  color: ${theme.text.danger};
`;

export const Success = styled.p`
  font-weight: 600;
  font-size: 18px;
  color: ${theme.text.success};
`;
