import styled from "styled-components";
import SettingButton from "../components/buttons/setting.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3%;
`;

const SkitschImage = styled.img`
  width: 100%;
  height: auto;
`;

function MyPage() {
  // + 무한 스크롤 구현 필요
  const [skitschList, setSkitschList] = useState([]); // Blob과 문자열 배열을 받을 state

  const getSkitschList = () => {
    axios
      .get("url", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("토큰 이름")}`,
        },
        responseType: "json",
      })
      .then((res) => {
        // 수정 필요
        // 서버가 데이터를 json 형식으로 blob 배열(이미지)과 문자열 배열(각 이미지의 고유 번호)을 제공한다는 가정 하
        const blobs = res.data.blobs;
        const urls = res.data.urls;

        const skitschData = blobs.map((blob, index) => {
          const imageUrl = window.URL.createObjectURL(
            new Blob([blob], { type: "image/jpeg" })
          );
          return {
            imageUrl: imageUrl,
            skitschNo: urls[index],
          };
        });

        setSkitschList(skitschData);
      })
      .catch((err) => {
        console.log("스키치 가져오기 오류: ", err);
      });
  };

  useEffect(() => {
    getSkitschList();
  }, []);

  return (
    <div className="width-wrapper">
      <div className="container">
        <SettingButton />
        <GridWrapper>
          {skitschList.map((skitsch, i) => (
            <div key={i}>
              <Link to={`/viewSkitsch/${skitsch.skitschNo}`}>
                <SkitschImage src={skitsch.imageUrl} alt={`Skitsch ${i}`} />
              </Link>
            </div>
          ))}
        </GridWrapper>
      </div>
    </div>
  );
}

export default MyPage;
