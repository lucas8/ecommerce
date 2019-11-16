import React, { useState } from "react";
import { MeStatusText, MeDescription } from "./style";
import Button from "../Button";
import { useMeContext } from "../../contexts/Me";
import PriceTitle from "./PriceTitle";
import {
  usePurchaseMutation,
  Post,
  PostsDocument
} from "../../generated/graphql";
import StatusText from "../StatusText";

interface ModalPurchaseFormProps {
  post: Post;
  refetch: any;
}

const stripe = window.Stripe("pk_test_PGr2UcNmiHlX7VhEIsN6sqsT00KcPDHxJG");

const ModalPurchaseForm = ({ post, refetch }: ModalPurchaseFormProps) => {
  const {
    state: { me }
  } = useMeContext();

  const [purchase] = usePurchaseMutation({ variables: { postId: post.id } });
  const [isLoading, setLoading] = useState(false);

  const [isSuccessful, setSuccess] = useState(false);

  const onClick = async () => {
    setLoading(true);

    const checkout = await purchase();

    await refetch();

    if (checkout.data && checkout.data.purchase) {
      // stripe.redirectToCheckout({
      //   sessionId: checkout.data.purchase
      // });
      setSuccess(true);
    }
    setLoading(false);
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
        style={
          isSuccessful
            ? { background: "#2BB75F", marginTop: 15, width: "100%" }
            : { marginTop: 15, width: "100%" }
        }
        onClick={() => onClick()}
        isLoading={isLoading}
        disabled={post.isPurchased}
      >
        {post.isPurchased
          ? "Sold Out"
          : isSuccessful
          ? "You Got it!"
          : isLoading
          ? "Processing"
          : "Purchase"}
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
