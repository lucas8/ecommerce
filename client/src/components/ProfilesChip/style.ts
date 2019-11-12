import styled from "styled-components";

export const ProfilesChipContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

export const ProfileChip = styled.img<{ left: number }>`
  width: 30px;
  height: 30px;
  border: 2px solid #fff;
  border-radius: 50%;

  :not(:first-child) {
    position: relative;
    right: ${({ left }) => left * 15}px;
    z-index: 1;
  }
`;
