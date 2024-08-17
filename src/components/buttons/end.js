import { useEffect, useState } from "react";
import styled from "styled-components";
import AlertBox from "../others/alert";
import { useNavigate } from "react-router-dom";

const Button = styled.div`
  width: 20%;
  position: absolute;
  top: 3%;
  right: 3%;
  background-color: pink;
  padding: 4%;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  padding: 3%;
  margin: 3%;
  border: 1px solid black;
  cursor: pointer;
`;

function EndButton() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const handleConfirmClick = () => {
    setShowAlert(false);
    navigate("/main"); // navigate로 경로 이동
    // 스키치 서버에 전송
  };
  return (
    <div>
      <Button onClick={() => setShowAlert(true)}>종료</Button>
      {showAlert && (
        <>
          <AlertBox id="confirmBox">
            이 스키치를 지금 완성할까요?
            <ConfirmButton
              onClick={() => {
                setShowAlert(false);
              }}
            >
              취소
            </ConfirmButton>
            <ConfirmButton onClick={handleConfirmClick}>네</ConfirmButton>
          </AlertBox>
        </>
      )}
    </div>
  );
}

export default EndButton;
