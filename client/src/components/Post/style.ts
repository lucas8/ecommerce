import styled from "styled-components";
import theme from "../../theme";

export const PostContainer = styled.div`
  max-width: 600px;
  width: 100%;
  background: ${theme.bg.secondary};
  border-radius: 10px;
  overflow: hidden;
  margin-top: 30px;
`;

export const PostHeader = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: ${theme.bg.alt};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PostHeadContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 150%;
`;

export const PostContent = styled.div`
  padding: 20px;
`;

export const PostImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 15px;
`;
