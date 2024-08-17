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

function GoBackButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)}>
      {" "}
      {/* 이전 페이지로 이동 */}
      <img src={"/img/icons/goBack.png"} alt="goBack" />
    </Button>
  );
}

export default GoBackButton;
