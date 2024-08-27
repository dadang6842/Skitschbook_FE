import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.img`
  width: 10%;
  position: absolute;
  right: 3%;
  top: 2%;
  cursor: pointer;
`;

function SettingButton() {
  const navigate = useNavigate();

  return <Button src="/img/1/3_setting.png" onClick={navigate("/setting")} />;
}

export default SettingButton;
