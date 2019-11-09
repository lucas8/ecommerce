import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {transform: rotate(360deg);}
`;

export const Loader = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;

  &:before {
    content: "";
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid white;
    border-top-color: transparent;
    border-right-color: white;
    border-bottom-color: transparent;
    animation: ${spin} 2s linear infinite;
  }
`;
