import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import PrevNextButton from "../components/buttons/prev_next";
import SettingButton from "../components/buttons/setting";
import AlertBox from "../components/others/alert";

const Image = styled.img`
  width: 90%;
`;

function ViewSkitsch() {
  // const params = useParams();
  const [skitsch, setSkitsch] = useState(null);
  const [showSkitsch, setShowSkitsch] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const showImage = () => {
    axios
      .get("url", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("토큰 이름")}`,
        },
        responseType: "blob",
      })
      .then((res) => {
        const imageUrl = window.URL.createObjectURL(res.data);
        setSkitsch(imageUrl);
        setShowSkitsch(true);
      })
      .catch((err) => {
        console.log("이미지 가져오기 오류: ", err);
      });
  };

  const downloadImage = () => {
    const a = document.createElement("a");
    a.href = skitsch;
    a.download = "skitsch_image.jpg"; // 이미지 이름
    document.body.appendChild(a);
    a.click();
    a.remove();
    setIsDownloaded(true);
  };

  useEffect(() => {
    showImage();

    // 컴포넌트 언마운트 시 URL 해제
    return () => {
      if (skitsch) {
        window.URL.revokeObjectURL(skitsch);
      }
    };
  }, []);

  // 이전 스키치로 이동하는 메서드
  const moveToPrevSkitsch = () => {};

  // 다음 스키치로 이동하는 메서드
  const moveToNextSkitsch = () => {};

  return (
    <div className="width-wrapper">
      <div className="container">
        <SettingButton />
        {showSkitsch && <Image src={skitsch} />}
        <div className="prev-next-buttons">
          <PrevNextButton>뒤로 가기</PrevNextButton>
          <PrevNextButton onClick={downloadImage}>다운로드</PrevNextButton>
          {isDownloaded && <AlertBox>다운로드 완료!</AlertBox>}
        </div>
      </div>
    </div>
  );
}

export default ViewSkitsch;
