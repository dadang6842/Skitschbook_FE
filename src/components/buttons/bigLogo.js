import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.img`
  width: 45%;
  position: absolute;
  top: 2%;
  left: 3%;
  cursor: pointer;
`;

function BigLogo() {
  const navigate = useNavigate();

  return <Button src="/img/icons/bigLogo.png" onClick={() => navigate("/")} />;
}

export default BigLogo;
