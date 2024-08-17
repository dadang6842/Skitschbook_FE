import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadImage from "./pages/UploadImage.js";
import UploadImageSetting from "./pages/UploadImageSetting.js";
import UploadImageFinished from "./pages/UploadImageFinished.js";
import DrawSkitschWithProvider from "./pages/DrawSkitsch.js";
import Main from "./pages/Main.js";
import MyPage from "./pages/MyPage.js";
import Login from "./pages/Login.js";
import InputName from "./pages/InputName.js";
import SkitschFinished from "./pages/SkitschFinished.js";
import Setting from "./pages/Setting.js";
import ChangeName from "./pages/ChangeName.js";
import Inquiry from "./pages/Inquiry.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/drawSkitsch" element={<DrawSkitschWithProvider />} />
        <Route path="/uploadImage" element={<UploadImage />} />
        <Route path="/uploadImageSetting" element={<UploadImageSetting />} />
        <Route path="/uploadImageFinished" element={<UploadImageFinished />} />
        <Route path="/skitschFinished" element={<SkitschFinished />} />
        <Route path="/inputName" element={<InputName />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/changeName" element={<ChangeName />} />
        <Route path="/inquiry" element={<Inquiry />} />
      </Routes>
      <form>
        <input type="text"></input>
      </form>
    </div>
  );
}

export default App;
