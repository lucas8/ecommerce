import styled, { css } from "styled-components";
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

export const HeadText = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: #fff;
`;

export const SubHeaderText = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: #ffffff50;
`;

export const Bold = styled.b`
  font-weight: bold;
  font-size: 14px;
  color: #fff;
`;

export const Paragraph = styled.p`
  font-size: 14px;
  color: #fff;
  font-weight: normal;
`;

interface ResponseFieldProps {
  flavor: "danger" | "success";
}

export const ResponseField = styled.p<ResponseFieldProps>`
  font-weight: 600;
  font-size: 18px;

  ${props =>
    props.flavor === "danger" &&
    css`
      color: ${theme.text.danger};
    `}
  ${props =>
    props.flavor === "success" &&
    css`
      color: ${theme.text.success};
    `}
`;
