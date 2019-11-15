import React, { useState } from "react";
import { MeStatusText, MeDescription } from "./style";
import Button from "../Button";
import { useMeContext } from "../../contexts/Me";
import PriceTitle from "./PriceTitle";
import { usePurchaseMutation } from "../../generated/graphql";

interface ModalPurchaseFormProps {
  postId: string;
}

const stripe = window.Stripe("pk_test_PGr2UcNmiHlX7VhEIsN6sqsT00KcPDHxJG");

const ModalPurchaseForm = ({ postId }: ModalPurchaseFormProps) => {
  const {
    state: { me }
  } = useMeContext();
  const [purchase] = usePurchaseMutation({ variables: { postId } });
  const [isLoading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);

    const checkout = await purchase();

    if (checkout.data && checkout.data.purchase) {
      stripe.redirectToCheckout({
        sessionId: checkout.data.purchase
      });
    }
  };

  return (
    <div>
      <MeStatusText>
        Logged in as {me && `${me.firstName} ${me.lastName}`}
      </MeStatusText>
      <MeDescription>{me && me.email}</MeDescription>
      <PriceTitle price={300} />
      <Button
        type="submit"
        style={{ marginTop: 15, width: "100%" }}
        onClick={() => onClick()}
        isLoading={isLoading}
      >
        {isLoading ? "Processing" : "Purchase"}
      </Button>
    </div>
  );
};

export default ModalPurchaseForm;

/*
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
*/
