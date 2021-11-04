import styled from "styled-components";

export const Status = styled.div`
  width: 130px;
  color: ${({ error }) => (error ? "rgb(247,49,49)" : "")};
  font-weight: 700;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const AccessRequired = styled.div`
  font-size: 1rem;
  color: white;
  padding: 0 25px;
  text-align: center;
`;
