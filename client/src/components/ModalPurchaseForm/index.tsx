import React, { useState } from "react";
import { MeStatusText, MeDescription } from "./style";
import Button from "../Button";
import { useMeContext } from "../../contexts/Me";
import PriceTitle from "./PriceTitle";
import { usePurchaseMutation, Post } from "../../generated/graphql";

interface ModalPurchaseFormProps {
  post: Post;
}

const stripe = window.Stripe("pk_test_PGr2UcNmiHlX7VhEIsN6sqsT00KcPDHxJG");

const ModalPurchaseForm = ({ post }: ModalPurchaseFormProps) => {
  const {
    state: { me }
  } = useMeContext();

  const [purchase] = usePurchaseMutation({ variables: { postId: post.id } });
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
      <PriceTitle price={post.price} />
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
