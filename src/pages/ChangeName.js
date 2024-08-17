import { useState } from "react";
import styled from "styled-components";
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

function ChangeName() {
  const [name, setName] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const finishedChangeName = () => {
    // 이름 서버로 전송
    //   axios
    //     .post("url", name, {
    //       headers: {
    //         Authorization: `Bearer ${토큰}`,
    //       },
    //     })
    //     .then((res) => console.log("이름 변경 성공"))
    //     .catch((err) => console.log("이름 변경 실패", err));
    //   setIsChanged(true);
    //   setTimeout(() => setIsChanged(false), 2000);
  };

  return (
    <div className="width-wrapper">
      <div className="container">
        <GoBackButton />
        <PageTitle>이름 변경</PageTitle>
        <TextBox
          type="text"
          value={name}
          placeholder="변경할 이름을 입력하세요"
          onChange={handleChangeName}
        />
        <ChangeButton onClick={finishedChangeName}>변경</ChangeButton>
        {isChanged && <AlertBox>변경되었습니다!</AlertBox>}
      </div>
    </div>
  );
}

export default ChangeName;
