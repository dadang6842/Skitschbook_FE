import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import SmallLogo from "../components/buttons/smallLogo";
import SettingButton from "../components/buttons/setting";
import AlertBox from "../components/others/alert";

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
  const [skitschUrl, setSkitschUrl] = useState("");
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    axios
      .get("url", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("토큰 이름")}`,
        },
        responseType: "blob",
      })
      .then((res) => {
        const skitsch = res.data;
        setSkitschUrl(URL.createObjectURL(skitsch));
        console.log("스키치 가져오기 성공");
      })
      .catch((err) => console.log("스키치 가져오기 실패: ", err));

    return () => {
      if (skitschUrl) {
        URL.revokeObjectURL(skitschUrl);
      }
    };
  }, []);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = skitschUrl;
    a.download = "skitsch.png"; // 파일명
    a.click();
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2000);
  };

  return (
    <div className="width-wrapper">
      <div className="container">
        <SmallLogo />
        <SettingButton />
        <GreyButton>스키치가 저장되었습니다</GreyButton>
        <img src={skitschUrl} alt="완성된 스키치" style={{ width: "70%" }} />
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
