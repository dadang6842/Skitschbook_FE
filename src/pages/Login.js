import styled from "styled-components";
import HomeButton from "../components/buttons/home";
const LoginBox = styled.div`
  width: 70%;
  padding: 6%;
  background-color: pink;
  margin-top: 5%;
`;

const SnsButton = styled.div`
    width: 10%;
    padding; 7%;
    position: absolute;
    bottom: 3%;
    left: 3%;
    background-color: pink;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Login() {
  return (
    <div className="width-wrapper">
      <div className="container">
        <HomeButton />
        <LoginBox>카카오</LoginBox>
        <LoginBox>네이버</LoginBox>
        <LoginBox>구글</LoginBox>
        <SnsButton>SNS</SnsButton>
      </div>
    </div>
  );
}

export default Login;
