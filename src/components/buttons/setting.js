import styled from "styled-components";

const Button = styled.div`
  width: 10%;
  padding: 3%;
  position: absolute;
  right: 3%;
  top: 3%;
  background-color: pink;
  cursor: pointer;
`;

function SettingButton() {
  return <Button>설정</Button>;
}

export default SettingButton;
