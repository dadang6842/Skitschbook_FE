import { useState } from "react";
import axios from "axios";
import AlertBox from "../components/others/alert";
import BigLogo from "../components/buttons/bigLogo";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ConfirmButton = styled.img`
  width: 20%;
  position: absolute;
  right: 10%;
  bottom: 35%;
  cursor: pointer;
`;

const InputBox = styled.img`
  width: 75%;
`;

const Input = styled.input`
  width: 65%;
  height: 8%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background: transparent;
  outline: none;
`;

function InputName() {
  const [username, setUsername] = useState("");
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [containSwearWord, setContainSwearWord] = useState(false);
  const [isUsernameLong, setIsUsernameLong] = useState(false);
  const navigate = useNavigate();

  const setName = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    if (username === "") {
      setIsUsernameEmpty(true);
      setTimeout(() => setIsUsernameEmpty(false), 2000);
    } else if (
      username.indexOf("시발") != -1 ||
      username.indexOf("새끼") != -1 ||
      username.indexOf("좆") != -1
    ) {
      setContainSwearWord(true);
      setTimeout(() => setContainSwearWord(false), 2000);
    } else if (username.length > 8) {
      setIsUsernameLong(true);
      setTimeout(() => setIsUsernameLong(false), 2000);
    } else {
      // 서버에 이름 전달
      // axios.post("url", username),
      //   {
      //     headers: {
      //       Autorization: `Bearer ${localStorage.getItem("토큰 이름")}`,
      //     },
      //   }
      //     .then(() => {})
      //     .catch((err) => {
      //       console.log("이름 전송 오류: ", err);
      //     });
      navigate("/main");
    }
  };

  return (
    <div className="width-wrapper">
      <div className="container">
        <BigLogo />
        <InputBox src="/img/3/1_inputBox.png" />
        <Input type="text" onChange={setName} />
        <ConfirmButton src="/img/3/2_confirm.png" onClick={handleSubmit} />
        {isUsernameEmpty && <AlertBox>이름을 입력하세요.</AlertBox>}
        {containSwearWord && <AlertBox>바르고 고운 말을 사용하세요.</AlertBox>}
        {isUsernameLong && <AlertBox>이름을 8자 이하로 입력헤주세요.</AlertBox>}
      </div>
    </div>
  );
}

export default InputName;
