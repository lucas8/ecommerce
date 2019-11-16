import React from "react";
import styled from "styled-components";
import { StyledThemeType } from "../../theme";

const PriceTitleContainer = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 48px;
  color: ${({ theme }: StyledThemeType) => theme.text.default};
`;

const PriceChip = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: ${({ theme }: StyledThemeType) => theme.bg.secondary};
  background: ${({ theme }: StyledThemeType) => theme.bg.alt};
  padding: 3px 5px;
  text-transform: uppercase;
  border-radius: 2px;
  opacity: 0.6;
  margin-left: 10px;
`;

const StyledDescription = styled.p`
  opacity: 0.6;
  font-size: 16px;
  color: #8f9cb2;
  text-align: center;
  margin-top: 10px;
`;

const PriceTitle = ({ price }: { price: number }) => {
  return (
    <PriceTitleContainer>
      <TitleContainer>
        <Title>${price}</Title>
        <PriceChip>usd</PriceChip>
      </TitleContainer>
      <StyledDescription>
        No hidden fees, you only pay once{" "}
        <span role="img" aria-label="party-emoji">
          🎉
        </span>
      </StyledDescription>
    </PriceTitleContainer>
  );
};

export default PriceTitle;
