import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.img`
  width: 15%;
  position: absolute;
  top: 2%;
  left: 3%;
  cursor: pointer;
`;

function SmallLogo() {
  const navigate = useNavigate();

  return (
    <Button src="/img/icons/smallLogo.png" onClick={() => navigate("/")} />
  );
}

export default SmallLogo;
