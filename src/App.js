import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadImage from "./pages/4_uploadImage.js";
import UploadImageSetting from "./pages/5_uploadImageSetting.js";
import UploadImageFinished from "./pages/6_uploadImageFinished.js";
import DrawSkitschWithProvider from "./pages/12_drawSkitsch.js";
import Main from "./pages/0_main.js";
import MyPage from "./pages/7_myPage.js";
import Login from "./pages/2_login.js";
import InputName from "./pages/3_inputName.js";
import SkitschFinished from "./pages/13_skitschFinished.js";
import Setting from "./pages/9_setting.js";
import ChangeName from "./pages/10_changeName.js";
import Inquiry from "./pages/11_inquiry.js";
import ViewSkitsch from "./pages/8_viewSkitsch.js";
import Loading from "./pages/14_loading.js";
import ExpiredUrl from "./pages/15_expiredUrl.js";
import Error from "./pages/16_error.js";

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
        <Route path="/viewSkitsch/:" element={<ViewSkitsch />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/expiredUrl" element={<ExpiredUrl />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
