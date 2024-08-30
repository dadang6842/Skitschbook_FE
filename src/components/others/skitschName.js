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
  const [nickname, setName] = useState("");

  useEffect(() => {
    axios
      .put("http://localhost:8080/update/nickname", {nickname}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setName(res.data.message);
        console.log("이름 가져오기 성공");
      })
      .catch((err) => console.log("이름 가져오기 실패", err));
  });

  return <Box>{nickname}님의 스키치</Box>;
}

export default SkitschNameBox;
