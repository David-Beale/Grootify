import styled, { keyframes } from "styled-components";

const spin = keyframes`
from {
  transform: rotate3d(.5,.5,.5, 360deg);
}
to{
  transform: rotate3d(0deg);
}
`;

export const Container = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top, #034412, #000000);
`;
const Circle = styled.div`
  width: 33vh;
  height: 33vh;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.div`
  color: white;
  font-size: 2rem;
`;
export const Border1 = styled(Circle)`
  padding: 3px;
  box-shadow: inset -0 0 75px 0px rgba(83, 198, 251, 0.7);
  border: 3px solid rgb(83, 198, 251);
  animation: ${spin} 1.8s linear 0s infinite;
`;

export const Border2 = styled(Circle)`
  padding: 3px;
  box-shadow: inset -0 0 75px 0px rgba(2, 238, 120, 0.7);
  border: 3px solid rgb(2, 238, 120);

  animation: ${spin} 2.5s linear 0s infinite;
`;
