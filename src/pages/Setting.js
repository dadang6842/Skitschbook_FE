import styled from "styled-components";
import GoBackButton from "../components/buttons/goBack";
import SNSButton from "../components/buttons/sns";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/others/pageTitle";

const GreyBox = styled.div`
  width: 20%;
  padding: 3%;
  background-color: #c2c5cc;
  margin-bottom: 3%;
  display: flex;
  margin-right: auto;
`;

const PinkButton = styled.div`
  width: 85%;
  padding: 3%;
  background-color: pink;
  margin-bottom: 3%;
  margin-right: auto;
  cursor: pointer;
`;

const SmallPinkButton = styled.div`
  width: 20%;
  padding: 3%;
  background-color: pink;
  margin-top: 3%;
  margin-right: auto;
  cursor: pointer;
`;

function Setting() {
  const navigate = useNavigate();
  return (
    <div className="width-wrapper">
      <div className="container">
        <GoBackButton />
        <PageTitle>공지사항</PageTitle>
        <GreyBox>프로필</GreyBox>
        <PinkButton onClick={navigate("/changeName")}>이름 변경</PinkButton>
        <GreyBox>정보</GreyBox>
        <GreyBox>버전</GreyBox>
        <PinkButton onClick={navigate("/inquiry")}>문의하기</PinkButton>
        <SmallPinkButton>로그아웃</SmallPinkButton>
        <SmallPinkButton>회원탈퇴</SmallPinkButton>
        <SNSButton />
      </div>
    </div>
  );
}

export default Setting;
