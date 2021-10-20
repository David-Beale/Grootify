import styled from "styled-components";
import { spotifyGreen } from "../../colors";

export const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const Status = styled.div`
  width: 130px;
  color: ${({ error }) => (error ? "rgb(247,49,49)" : "")};
  font-weight: 700;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const LoginButton = styled.div`
  background-color: ${spotifyGreen};
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border-radius: 25px;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 0 6px 0px white;
  user-select: none;
`;
