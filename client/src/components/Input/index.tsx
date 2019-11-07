import React, { Fragment, forwardRef } from "react";
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
} & any;

const Input = forwardRef(
  ({ inputName, label, error, ...rest }: InputProps, ref: any) => {
    return (
      <Fragment>
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
        />
      </Fragment>
    );
  }
);

export default Input;
