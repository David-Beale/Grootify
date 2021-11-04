import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  color: rgb(0, 37, 46);
  z-index: 0;
  background-color: black;
`;
export const Background = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: radial-gradient(circle at top, #034412, #000000);
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 2s ease-in-out;
  z-index: 1;
`;
