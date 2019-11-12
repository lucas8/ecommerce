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
    grid-template-rows: 1fr 1fr;
  }
`;
