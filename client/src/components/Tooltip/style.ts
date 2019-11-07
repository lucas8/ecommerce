import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { StyledThemeType } from "../../theme";

export const StyledReactTooltip = styled(ReactTooltip)`
  color: white !important;
  background-color: rgba(0, 0, 0, 0.8) !important;

  -webkit-backdrop-filter: blur(10px) !important;
  backdrop-filter: blur(10px) !important;

  font-family: ${({ theme }: StyledThemeType) => theme.fonts.body} !important;
  font-weight: 600 !important;

  :after {
    border-bottom-color: rgba(0, 0, 0, 0.8) !important;
    border-bottom-style: solid !important;
    border-bottom-width: 6px !important;

    -webkit-backdrop-filter: blur(10px) !important;
    backdrop-filter: blur(10px) !important;
  }
`;
