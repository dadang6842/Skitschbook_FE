import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.div`
  width: 8%;
  padding: 5px;
  background-color: pink;
  position: absolute;
  top: 3%;
  left: 3%;
  cursor: pointer;
`;

function HomeButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate("/main")}>
      <img src={"/img/icons/home.png"} alt="home" />
    </Button>
  );
}

export default HomeButton;
