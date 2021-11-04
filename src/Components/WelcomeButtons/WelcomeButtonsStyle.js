import styled from "styled-components";
import { colors } from "../../colors";

export const WelcomeButtonsContainer = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 4;
`;
export const Button = styled.div`
  background-color: ${colors.spotifyGreen};
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 0 6px 0px white;
  user-select: none;
  transition: background-position 0.2s ease-in-out;
  background-image: linear-gradient(to top, white 50%, transparent 50%);
  background-size: 100% 200%;
  background-position: top;
  &:hover {
    background-position: bottom;
    color: ${colors.spotifyGreen};
    font-weight: 600;
  }
`;
export const Or = styled.div`
  font-size: 1.2rem;
  margin-bottom: 45px;
`;

export const Input = styled.input`
  position: fixed;
  left: 9999px;
`;
