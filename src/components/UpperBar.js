import styled from "styled-components";

const BasicUpperBar = styled.div`
  width: 100%;
  height: 10vh;
  position: absolute;
  top: 0;
  border: 1px solid blue;
`;

function UpperBar() {
  return <BasicUpperBar></BasicUpperBar>;
}

export default UpperBar;
