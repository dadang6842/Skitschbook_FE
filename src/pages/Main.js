import { useState } from "react";
import HomeButton from "../components/buttons/home";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SettingButton from "../components/buttons/setting";
import SNSButton from "../components/buttons/sns";

const MainButton = styled.div`
  width: 75%;
  padding: 8%;
  margin-top: 10%;
  background-color: pink;
  cursor: pointer;
`;

const LoginButton = styled.div`
  width: 10%;
  padding: 3%;
  position: absolute;
  right: 3%;
  top: 3%;
  background-color: pink;
  cursor: pointer;
`;

function Main() {
  const [isLogined, setIsLogined] = useState(true);
  const navigate = useNavigate();

  const makeNewSkitsch = () => {
    isLogined ? navigate("/uploadImage") : navigate("/login");
  };

  const showPrevSkitsch = () => {
    isLogined ? navigate("/mypage") : navigate("/login");
  };

  const SnsLogin = () => {
    isLogined ? navigate("/drawSkitsch") : navigate("/login"); // sns창의 역할?
  };

  return (
    <div className="width-wrapper">
      <div className="container">
        <HomeButton />
        {isLogined ? (
          <SettingButton onClick={() => navigate("/setting")} />
        ) : (
          <LoginButton onClick={() => navigate("/login")}>
            로그인하세요
          </LoginButton>
        )}
        <MainButton onClick={() => makeNewSkitsch()}>새 스키치</MainButton>
        <MainButton onClick={() => showPrevSkitsch()}>지난 스키치</MainButton>
        <SNSButton />
      </div>
    </div>
  );
}

export default Main;
