import styled from "styled-components";

const ErrorContainer = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background: radial-gradient(circle at top, #034412, #000000);
  color: white;
  text-align: center;
  padding: 30px;
`;
export default function Error() {
  return (
    <ErrorContainer>
      Sorry this app is not suitable for mobile devices 😞
    </ErrorContainer>
  );
}
