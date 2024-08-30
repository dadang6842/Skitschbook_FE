import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Box = styled.div`
  width: 50%;
  padding: 4%;
  position: absolute;
  top: 3%;
  background-color: #c2c5cc;
`;

function SkitschNameBox() {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const response = await axios.put(
          "url", // todo 
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setNickname(response.data.message);
        console.log("이름 가져오기 성공");
      } catch (err) {
        console.error("이름 가져오기 실패", err);
      }
    };

    fetchNickname();
  }, []); // 빈 배열로 변경하여 컴포넌트가 마운트될 때만 호출

  return <Box>{nickname}님의 스키치</Box>;
}

export default SkitschNameBox;
