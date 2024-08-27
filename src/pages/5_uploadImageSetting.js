import PrevNextButton from "../components/buttons/prev_next.js";
import { useNavigate } from "react-router-dom";
import BigLogo from "../components/buttons/bigLogo.js";
import ExplanationBox from "../components/others/explanationBox.js";
import { useState } from "react";
import axios from "axios";

function UploadImageSetting() {
  const navigate = useNavigate();
  // '누구나 스키치할 수 있게 하기' 선택 시 true, '로그인한 사람만 스키치할 수 있게 하기' 선택 시 false 값을 서버에 보냄
  const [canAllUserSkitsch, setCanAllUsersSkitch] = useState(true);

  const sendUserSkitschPermission = () => {
    axios
      .post("url", canAllUserSkitsch, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("토큰 이름")}`,
        },
      })
      .then(() => {
        console.log("사용자 설정 완료");
        navigate("/uploadImageFinished");
      })
      .catch((err) => {
        console.log("사용자 설정 오류: ", err);
      });
  };

  return (
    <div className="width-wrapper">
      <div className="container">
        <BigLogo />
        <ExplanationBox>누가 스키치 가능?</ExplanationBox>
        <button onClick={() => setCanAllUsersSkitch(true)}>
          누구나 스키치할 수 있게 하기
        </button>
        <button onClick={() => setCanAllUsersSkitch(false)}>
          로그인한 사람만 스키치할 수 있게 하기
        </button>
        <div className="prev-next-buttons">
          <PrevNextButton onClick={() => navigate("/uploadImage")}>
            이전
          </PrevNextButton>
          <PrevNextButton onClick={sendUserSkitschPermission}>
            다음
          </PrevNextButton>
        </div>
      </div>
    </div>
  );
}

export default UploadImageSetting;
