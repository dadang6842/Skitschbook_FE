import { useState } from "react";
import styled from "styled-components";
import HomeButton from "../components/buttons/home";
import SettingButton from "../components/buttons/setting";
import AlertBox from "../components/others/alert";
import { useNavigate } from "react-router-dom";

const GreyButton = styled.div`
  width: 65%;
  padding: 4%;
  margin: 10%;
  background-color: #c2c5cc;
`;

const PinkButton = styled.div`
  width: 75%;
  padding: 8%;
  margin-top: 10%;
  background-color: pink;
  cursor: pointer;
`;

function SkitschFinished() {
  const navigate = useNavigate();
  const [isDownloaded, setIsDownloaded] = useState(false);
  const handleDownload = () => {
    // 사진 서버에서 가져와서 다운로드
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2000);
  };
  return (
    <div className="width-wrapper">
      <div className="container">
        <HomeButton />
        <SettingButton />
        <GreyButton>스키치가 저장되었습니다</GreyButton>
        <PinkButton onClick={handleDownload}>다운로드</PinkButton>
        <PinkButton onClick={() => navigate("/uploadImage")}>
          새 스키치 만들기
        </PinkButton>
        {isDownloaded && <AlertBox>다운로드 완료!</AlertBox>}
      </div>
    </div>
  );
}

export default SkitschFinished;
