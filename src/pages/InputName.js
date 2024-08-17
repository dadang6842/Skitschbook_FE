import { useState } from "react";
import HomeButton from "../components/buttons/home";
import AlertBox from "../components/others/alert";

function InputName() {
  const [username, setUsername] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const setName = (e) => {
    setUsername(e.target.value);
    setShowAlert(false); // 사용자가 입력할 때마다 경고를 숨김
  };

  const handleSubmit = () => {
    if (username === "") {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      // 서버에 이름 전달
    }
  };

  return (
    <div className="width-wrapper">
      <div className="container">
        <HomeButton />
        <input
          type="text"
          onChange={setName}
          className="border-solid border-black"
        />
        <button className="border-solid border-black" onClick={handleSubmit}>
          제출
        </button>
        {showAlert && <AlertBox>이름을 입력하세요.</AlertBox>}
      </div>
    </div>
  );
}

export default InputName;
