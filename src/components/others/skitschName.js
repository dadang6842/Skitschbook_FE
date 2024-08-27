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
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("url", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("토큰 이름")}`,
        },
      })
      .then((res) => {
        setName(res.data);
        console.log("이름 가져오기 성공");
      })
      .catch((err) => console.log("이름 가져오기 실패", err));
  });

  return <Box>{name}님의 스키치</Box>;
}

export default SkitschNameBox;
