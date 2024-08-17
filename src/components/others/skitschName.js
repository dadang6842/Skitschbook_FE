import styled from "styled-components";

const Box = styled.div`
  width: 50%;
  padding: 4%;
  position: absolute;
  top: 3%;
  background-color: #c2c5cc;
`;

function SkitschNameBox() {
  const name = "dahyun";

  return <Box>{name}님의 스키치</Box>;
}

export default SkitschNameBox;
