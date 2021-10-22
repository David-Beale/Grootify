import styled from "styled-components";
import { colors } from "../../../colors";

export const TrackResultContainer = styled.div`
  box-sizing: border-box;
  min-height: 65px;
  width: calc(100%);
  background-color: rgba(100, 110, 100, 1);
  margin-bottom: 2px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding-left: 100px;
  padding-right: 35px;

  &:hover {
    background-color: rgb(70, 80, 70);
    box-shadow: 0 0 10px 0px chartreuse;
  }
`;
export const Image = styled.img`
  height: 65px;
  width: 65px;
  position: absolute;
  left: 0;
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 50px);
`;
export const TrackTitle = styled.div`
  font-size: 1.1rem;
  color: ${colors.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Artist = styled.div`
  font-size: 0.8rem;
  color: ${colors.secondary};
  margin-top: 6px;
`;
export const Duration = styled.div`
  font-size: 1rem;
  color: ${colors.primary};
`;
