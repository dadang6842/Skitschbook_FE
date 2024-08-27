import styled from "styled-components";
import BigLogo from "../components/buttons/bigLogo";
import SNSButton from "../components/buttons/sns";

const LoginButton = styled.img`
  width: 70%;
  margin-top: 5%;
  cursor: pointer;
`;

function Login() {
  return (
    <div className="width-wrapper">
      <div className="container">
        <BigLogo />
        {/* 소셜 로그인 구현 */}
        <LoginButton src="/img/2/1_kakao.png" />
        <LoginButton src="/img/2/2_naver.png" />
        <LoginButton src="/img/2/3_google.png" />
        <SNSButton
          url={"https://www.instagram.com"}
          src={"/img/0/4_instagram.png"}
        />
        <SNSButton url={"https://twitter.com"} src={"/img/0/5_twitter.png"} />
      </div>
    </div>
  );
}

export default Login;
