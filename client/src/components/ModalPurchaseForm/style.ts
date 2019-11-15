import styled from "styled-components";
import { StyledThemeType } from "../../theme";

export const StyledCardContainer = styled.div`
  width: 100%;
  box-shadow: 0 0 0 2px ${({ theme }: StyledThemeType) => theme.bg.border};
  border-radius: 8px;
  padding: 13px 16px;
  margin: 5px 0 15px 0;
`;

export const MeStatusText = styled.h4`
  font-weight: bold;
  font-size: 16px;
  color: ${({ theme }: StyledThemeType) => theme.text.default};
  margin-bottom: 5px;
`;

export const MeDescription = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }: StyledThemeType) => theme.text.secondary};
`;
