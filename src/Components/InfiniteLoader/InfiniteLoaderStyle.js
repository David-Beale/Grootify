import styled from "styled-components";
export const StyledOuter = styled.div`
  box-sizing: border-box;
  z-index: 1;
  position: absolute;
  height: ${({ height }) => height}px;
  width: calc(100vw - 750px);
  overflow: auto;
  padding: 25px;
  overflow: auto;
  color: white;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
`;
export const StyledOuterTop = styled(StyledOuter)`
  transition: top 500ms ease-in-out;
  top: ${({ open }) => (open ? "75px" : "-100%")};
  left: 350px;
`;
export const StyledOuterLeft = styled(StyledOuter)`
  transition: left 500ms ease-in-out;
  top: 75px;
  left: ${({ open }) => (open ? "350px" : "-100%")};
`;
export const StyledInner = styled.div`
  position: relative;
`;
