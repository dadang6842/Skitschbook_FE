import styled from "styled-components";
import axios from "axios";
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
  const [email, setEmail] = useState("");
  const [isInquiryEmpty, setIsInquiryEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [finalConfirm, setFinalConfirm] = useState(false);
  const [submitFinished, setSubmitFinished] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // 서버에 보낼 url 형식의 파일
  const [fileName, setFileName] = useState("");

  const handleInquiryBox = (e) => {
    setInquiry(e.target.value);
  };

  const handleEmailBox = (e) => {
    setEmail(e.target.value);
  };

  const onSelectFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const nowUrl = URL.createObjectURL(file);
      setSelectedFile(nowUrl);
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    if (inquiry === "") {
      setIsInquiryEmpty(true);
      setTimeout(() => setIsInquiryEmpty(false), 2000);
    } else if (email === "") {
      setIsEmailEmpty(true);
      setTimeout(() => setIsEmailEmpty(false), 2000);
    } else {
      setFinalConfirm(true);
    }
  };

  const handleFinalConfirm = () => {
    // 문의사항, 이메일, 파일 전송
    const formData = new FormData();
    formData.append("inquiry", inquiry);
    formData.append("email", email);
    formData.append("file", selectedFile);

    axios
      .post("url", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("토큰 이름")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("전송 성공");
        setFinalConfirm(false);
        setSubmitFinished(true);
      })
      .catch((err) => console.log("전송 실패: ", err));
  };

  return (
    <div className="width-wrapper">
      <div className="container">
        <GoBackButton />
        <PageTitle>문의하기</PageTitle>
        <GreyBox>문의사항입력</GreyBox>
        <InquiryBox onChange={handleInquiryBox} value={inquiry} />
        <FileLabel>
          {fileName === "" ? (
            <>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={onSelectFile}
              />
              <p>파일 첨부</p>
            </>
          ) : (
            fileName
          )}
        </FileLabel>
        <GreyBox>답변 받을 이메일을 입력해주세요.</GreyBox>
        <EmailBox type="text" value={email} onChange={handleEmailBox} />
        <SubmitButtonDiv>
          <button onClick={handleSubmit} style={{ width: "100%" }}>
            제출
          </button>
        </SubmitButtonDiv>
        {isInquiryEmpty && <AlertBox>내용을 입력해주세요</AlertBox>}
        {isEmailEmpty && <AlertBox>이메일을 입력해주세요</AlertBox>}
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
            <ConfirmButton onClick={() => setSubmitFinished(false)}>
              네
            </ConfirmButton>
          </AlertBox>
        )}
      </div>
    </div>
  );
}

export default Inquiry;
