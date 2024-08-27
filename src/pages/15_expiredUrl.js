import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.div`
  width: 70%;
  background-color: pink;
  cursor: pointer;
`;

function ExpiredUrl() {
  const navigate = useNavigate();

  return (
    <div className="width-wrapper">
      <div className="container">
        <Button onClick={() => navigate("/main")}>홈으로</Button>
      </div>
    </div>
  );
}

export default ExpiredUrl;
