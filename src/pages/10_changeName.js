import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import GoBackButton from "../components/buttons/goBack";
import AlertBox from "../components/others/alert";
import PageTitle from "../components/others/pageTitle";

const TextBox = styled.input`
  width: 80%;
  padding: 5%;
  border: 2px solid pink;
`;

const ChangeButton = styled.div`
  width: 20%;
  padding: 3%;
  position: absolute;
  right: 10%;
  bottom: 35%;
  background-color: pink;
  cursor: pointer;
`;

function Changenickname() {
  const [nickname, setnickname] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const handleChangenickname = (e) => {
    setnickname(e.target.value);
  };

  const finishedChangenickname = async () => {
    // 이름 서버로 전송
    await axios
      .put("http://localhost:8080/update/nickname", {nickname}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        setIsChanged(true);
        setTimeout(() => setIsChanged(false), 2000);
        console.log("이름 변경 성공");
      })
      .catch((err) => console.log("이름 변경 실패", err));
  };

  return (
    <div classnickname="width-wrapper">
      <div classnickname="container">
        <GoBackButton />
        <PageTitle>이름 변경</PageTitle>
        <TextBox
          type="text"
          value={nickname}
          placeholder="변경할 이름을 입력하세요"
          onChange={handleChangenickname}
        />
        <ChangeButton onClick={finishedChangenickname}>변경</ChangeButton>
        {isChanged && <AlertBox>변경되었습니다!</AlertBox>}
      </div>
    </div>
  );
}

export default Changenickname;
