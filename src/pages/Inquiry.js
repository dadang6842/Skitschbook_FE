import styled from "styled-components";
import GoBackButton from "../components/buttons/goBack";
import PageTitle from "../components/others/pageTitle";
import { useState } from "react";
import AlertBox from "../components/others/alert";

const InquiryBox = styled.textarea`
  border: 2px solid pink;
  width: 80%;
  height: 20%;
  padding: 3%;
`;

const EmailBox = styled.input`
  border: 2px solid pink;
  width: 80%;
  padding: 3%;
`;

const GreyBox = styled.div`
  width: 80%;
  padding: 3%;
  background-color: #ced4da;
  margin: 2% 0;
`;

const ConfirmButton = styled.button`
  padding: 3%;
  margin: 3%;
  border: 1px solid black;
  cursor: pointer;
  background-color: pink;
`;

const SubmitButtonDiv = styled.button`
  position: relative;
  left: 30%;
  top: 3%;
  width: 20%;
  padding: 3%;
  background-color: pink;
`;

const FileLabel = styled.label`
  width: 80%;
  background-color: pink;
  padding: 3%;
  margin-top: 3%;
  cursor: pointer;
`;

function Inquiry() {
  const [inquiry, setInquiry] = useState("");
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [finalConfirm, setFinalConfirm] = useState(false);
  const [submitFinished, setSubmitFinished] = useState(false);
  // const [uploadedInfo, setUploadedInfo] = useState(null);

  const handleInquiryBox = (e) => {
    setInquiry(e.target.value);
  };

  const handleUploadFile = (e) => {
    setFile(e.target.files[0]); // 하나의 파일만 선택할 수 있는 경우. 파일 몇 개까지 업로드 가능하게 할 건지 얘기해보기
  };

  const handleEmailBox = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (inquiry === "") {
      setIsEmpty(true);
      setTimeout(() => setIsEmpty(false), 2000);
    } else {
      setFinalConfirm(true);
    }
  };

  const handleFinalConfirm = () => {
    setFinalConfirm(false);
    setSubmitFinished(true);
  };

  const handleSubmitFinished = () => {
    // // 문의사항 서버로 전송
    // // 파일 전송
    // // 이메일 있을 경우 이메일 전송 -> 세 개 같이 전송할 건지, 어떤 방식으로 전송할 건지 협의
    // const FormData = new FormData();
    // FormData.append("file", file);

    // axios
    //   .post("url", FormData, {
    //     headers: {
    //       Authorization: `Bearer ${토큰}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => console.log("전송 성공"))
    //   .catch((err) => console.log("전송 실패: ", err));
    setSubmitFinished(false);
  };

  // 업로드한 파일 정보 미리 보기 코드 작성

  return (
    <div className="width-wrapper">
      <div className="container">
        <GoBackButton />
        <PageTitle>문의하기</PageTitle>
        <GreyBox>문의사항입력</GreyBox>
        <InquiryBox onChange={handleInquiryBox} value={inquiry} />
        <FileLabel>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleUploadFile}
          />
        </FileLabel>
        <GreyBox>답변 받을 이메일을 입력해주세요.(선택사항)</GreyBox>
        <EmailBox type="text" value={email} onChange={handleEmailBox} />
        <SubmitButtonDiv>
          <button onClick={handleSubmit} style={{ width: "100%" }}>
            제출
          </button>
        </SubmitButtonDiv>
        {isEmpty && <AlertBox>내용을 입력해주세요</AlertBox>}
        {finalConfirm && (
          <AlertBox>
            제출하시겠습니까? <br /> (제출 시 수정 불가)
            <ConfirmButton
              onClick={() => {
                setFinalConfirm(false);
              }}
            >
              취소
            </ConfirmButton>
            <ConfirmButton onClick={handleFinalConfirm}>네</ConfirmButton>
          </AlertBox>
        )}
        {submitFinished && (
          <AlertBox>
            제출되었습니다. <br /> 감사합니다.
            <ConfirmButton onClick={handleSubmitFinished}>네</ConfirmButton>
          </AlertBox>
        )}
      </div>
    </div>
  );
}

export default Inquiry;
