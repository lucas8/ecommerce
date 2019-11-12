import React from "react";
import Input from "../Input";
import { FormRow } from "./style";
import Button from "../Button";

const ModalPurchaseForm = () => {
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
      <Button type="submit" style={{ marginTop: 15, width: "100%" }}>
        Purchase
      </Button>
    </form>
  );
};

export default ModalPurchaseForm;
