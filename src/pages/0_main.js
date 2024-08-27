import { useState } from "react";
import Logo from "../components/buttons/bigLogo";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SettingButton from "../components/buttons/setting";
import SNSButton from "../components/buttons/sns";
import DrawSkitsch from "./12_drawSkitsch";

const LoginButton = styled.img`
  width: 30%;
  position: absolute;
  right: 3%;
  top: 2%;
  cursor: pointer;
`;

const SkitschButton = styled.img`
  width: 75%;
  margin-top: 10%;
  cursor: pointer;
`;

function Main() {
  // 0, 1 화면 유사해서 하나의 페이지로 만듦
  const [isLogined, setIsLogined] = useState(true);
  const [isSkitschInProgress, setIsSkitschInProgress] = useState(false);
  const navigate = useNavigate();

  const makeNewSkitsch = () => {
    isLogined ? navigate("/uploadImage") : navigate("/login");
  };

  const showPrevSkitsch = () => {
    isLogined ? navigate("/mypage") : navigate("/login");
  };

  return (
    <div className="width-wrapper">
      <div className="container">
        <Logo />
        {isLogined ? (
          <SettingButton onClick={() => navigate("/setting")} />
        ) : (
          <LoginButton
            src="/img/0/3_login.png"
            onClick={() => navigate("/login")}
          />
        )}
        {/* 로그인 되어 있고 진행 중인 스키치 있을 경우 '진행 중인 스키치' 띄우기 */}
        {/* 남은 시간 구현해야 함 */}
        {isLogined && isSkitschInProgress ? (
          <SkitschButton
            src="/img/1/1_1_skitschInProgress.png"
            onClick={() => navigate("/drawSkitsch")} // 진행 중인 스키치로 이동해야 함 (실시간)
          />
        ) : (
          <SkitschButton
            src="/img/0/1_newSkitsch.png"
            onClick={() => makeNewSkitsch()}
          />
        )}
        <SkitschButton
          src="/img/0/2_prevSkitsch.png"
          onClick={() => showPrevSkitsch()}
        />
        <SNSButton
          url={"https://www.instagram.com"}
          src={"/img/0/4_instagram.png"}
        />
        <SNSButton url={"https://twitter.com"} src={"/img/0/5_twitter.png"} />
      </div>
    </div>
  );
}

export default Main;
