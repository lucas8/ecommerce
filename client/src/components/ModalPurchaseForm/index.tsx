import React from "react";
import Input from "../Input";
import { FormRow, StyledCardContainer } from "./style";
import Button from "../Button";
import { injectStripe, CardElement } from "react-stripe-elements";
import { useThemeContext } from "../../contexts/Theme";
import { StyledInputLabel } from "../Input/style";

const ModalPurchaseForm = () => {
  const {
    text: { default: cardColor, secondary },
    fonts: { body }
  } = useThemeContext();

  const cardStyle = {
    base: {
      color: cardColor,
      iconColor: cardColor,
      fontFamily: body,
      fontWeight: 500,
      "::placeholder": {
        color: secondary
      }
    }
  };

  return (
    <form>
      <Input inputName="Name" label="Name" hasBorder={true} />
      <FormRow>
        <Input inputName="address" label="Home Address" hasBorder={true} />
        <Input inputName="apt" label="Apt / Suite" hasBorder={true} />
      </FormRow>
      <FormRow>
        <Input inputName="city" label="City" hasBorder={true} />
        <Input inputName="state" label="State" hasBorder={true} />
      </FormRow>
      <FormRow>
        <Input inputName="country" label="Country" hasBorder={true} />
        <Input inputName="zip" label="Zip Code" hasBorder={true} />
      </FormRow>
      <div style={{ marginTop: 15 }}>
        <StyledInputLabel>Card:</StyledInputLabel>
        <StyledCardContainer>
          <CardElement style={cardStyle} />
        </StyledCardContainer>
      </div>
      <Button type="submit" style={{ marginTop: 15, width: "100%" }}>
        Purchase
      </Button>
    </form>
  );
};

export default injectStripe(ModalPurchaseForm);
