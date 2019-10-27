import React from "react";
import styled from "styled-components";
import theme from "../theme";

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const InputElement = styled.input<{ hasIcon: boolean }>`
  outline: none;
  border: 1px solid transparent;
  height: 60px;
  width: 100%;
  background: ${theme.bg.default};
  border-radius: 10px;

  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  padding: ${props => (props.hasIcon ? "20px 20px 20px 60px" : "20px")};
  border: 1.5px solid ${theme.bg.secondary};
  transition: box-shadow 0.2s ease-in-out;

  &:focus {
    border: 1.5px solid transparent;
    box-shadow: 0 0 0 2px ${theme.bg.secondary}, 0 0 0 2px ${theme.bg.alt};
    transition: box-shadow 0.2s ease-in-out;
    background: ${theme.bg.secondary};
  }
`;

const InputIcon = styled.img`
  position: absolute;
  left: 20px;
`;

const Input = React.forwardRef(
  ({ icon, containerStyle, ...props }: any, ref: React.Ref<any>) => {
    return (
      <InputWrapper style={{ ...containerStyle }}>
        {icon && <InputIcon src={icon} alt="icon" draggable={false} />}
        <InputElement hasIcon={!!icon} {...props} ref={ref} />
      </InputWrapper>
    );
  }
);

export default Input;
