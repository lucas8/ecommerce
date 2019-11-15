import styled from "styled-components";
import { StyledThemeType } from "../../theme";

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 15px;
  margin-top: 15px;

  @media (max-width: ${({ theme }: StyledThemeType) => theme.mobile}) {
    grid-template-columns: 1fr;
    grid-template-columns: 50% minmax(0, 1fr);
  }
`;

export const StyledCardContainer = styled.div`
  width: 100%;
  box-shadow: 0 0 0 2px ${({ theme }: StyledThemeType) => theme.bg.border};
  border-radius: 8px;
  padding: 13px 16px;
  margin: 5px 0 15px 0;
`;
