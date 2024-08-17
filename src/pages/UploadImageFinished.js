import React, { useState } from "react";
import HomeButton from "../components/buttons/home";
import ExplanationBox from "../components/others/explanationBox";
import { useSelector } from "react-redux";
import WideWidthButton from "../components/buttons/WideWidthButton";
import AlertBox from "../components/others/alert";
import { useNavigate } from "react-router-dom";

function UploadImageFinished() {
  const [showAlert, setShowAlert] = useState(false);
  const finalCroppedImage = useSelector((state) => state.finalCroppedImage);
  const url = `${window.location.host}/drawSkitsch`;
  const navigate = useNavigate();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(url);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  return (
    <div className="width-wrapper">
      <div className="container">
        <HomeButton />
        <ExplanationBox>설명</ExplanationBox>
        <div className="content">
          {finalCroppedImage ? (
            <>
              <img
                src={finalCroppedImage} // 지금은 redux에 저장해 사용하고 있지만 서버로 넘겨줘야 함
                alt="finalCroppedImage"
                style={{
                  objectFit: "contain",
                  width: "70%",
                  marginBottom: "7%",
                }}
              />
              <WideWidthButton onClick={handleCopyClick}>
                URL 복사
              </WideWidthButton>
              <WideWidthButton onClick={() => navigate("/drawSkitsch")}>
                해당 스키치로 이동
              </WideWidthButton>
              {showAlert && <AlertBox>복사되었습니다!</AlertBox>}
            </>
          ) : (
            <p>이미지 없음</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadImageFinished;
