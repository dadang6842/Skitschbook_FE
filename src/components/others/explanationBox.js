import styled from "styled-components";

const Box = styled.div`
  width: 90%;
  height: 10%;
  position: absolute;
  top: 12%;
  background-color: #ced4da;
`;

function ExplanationBox({ children }) {
  return <Box>{children}</Box>;
}

export default ExplanationBox;
