import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 10;
  max-height: ${({ open }) => (open ? 166 : 30)}px;
  overflow: hidden;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: opacity 1s;
`;
export const StyledIcon = styled.img`
  height: 30px;
  width: 30px;
  cursor: pointer;
`;
