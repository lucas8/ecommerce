import styled from "styled-components";
import { ThemeType } from "../../theme";

export const StyledMenuIcon = styled.button<{ open: boolean }>`
  transform: scale(0.5);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.3rem;
    background: ${({ theme, open }: { theme: ThemeType; open: boolean }) =>
      open ? theme.bg.border : theme.bg.secondary};
    border-radius: 20px;
    transition: all 250ms linear;
    position: relative;
    transform-origin: 1rem;

    :first-child {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "scale(0)" : "scale(1)")};
    }

    :nth-child(2) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(3) {
      position: absolute;
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }

    :nth-child(4) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "scale(0)" : "scale(1)")};
    }
  }
`;

export const MenuWrapper = styled.div<{ open: boolean }>`
  transition: all ease 250ms;
  background: ${({ theme, open }: { theme: ThemeType; open: boolean }) =>
    open ? theme.text.default : theme.bg.alt};
  border-radius: 6px;
`;
