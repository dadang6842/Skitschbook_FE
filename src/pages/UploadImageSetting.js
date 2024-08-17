import PrevNextButton from "../components/buttons/prev_next.js";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/buttons/home.js";
import ExplanationBox from "../components/others/explanationBox.js";

function UploadImageSetting() {
  const navigate = useNavigate();

  return (
    <div className="width-wrapper">
      <div className="container">
        <HomeButton />
        <ExplanationBox>누가 스키치 가능?</ExplanationBox>
        <div className="prev-next-buttons">
          <PrevNextButton onClick={() => navigate("/uploadImage")}>
            이전
          </PrevNextButton>
          <PrevNextButton onClick={() => navigate("/uploadImageFinished")}>
            다음
          </PrevNextButton>
        </div>
      </div>
    </div>
  );
}

export default UploadImageSetting;
