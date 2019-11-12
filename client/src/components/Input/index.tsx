import React, { forwardRef } from "react";
import {
  StyledInput,
  StyledInputContainer,
  StyledInputLabel,
  StyledError
} from "./style";
import { FieldError } from "react-hook-form/dist/types";

type InputProps = {
  label: string;
  error: FieldError | undefined;
  hasBorder: boolean;
} & any;

const Input = forwardRef(
  (
    { inputName, label, error, hasBorder = false, ...rest }: InputProps,
    ref: any
  ) => {
    return (
      <div>
        <StyledInputContainer>
          <StyledInputLabel htmlFor={`input-${rest.name}`}>
            {label}
          </StyledInputLabel>
          <StyledError>{error && error.message}</StyledError>
        </StyledInputContainer>
        <StyledInput
          id={`input-${rest.name}`}
          {...rest}
          ref={ref}
          hasError={!!error}
          hasBorder={hasBorder}
        />
      </div>
    );
  }
);

export default Input;
