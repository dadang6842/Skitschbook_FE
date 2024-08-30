import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadImage from "./pages/4_uploadImage.js";
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
import NaverRedirection from "./functions/2_login/2_naverRedirection.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inputName" element={<InputName />} />
        <Route path="/uploadImage" element={<UploadImage />} />
        <Route path="/uploadImageFinished" element={<UploadImageFinished />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/viewSkitsch/:id" element={<ViewSkitsch />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/changeName" element={<ChangeName />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/drawSkitsch:id" element={<DrawSkitschWithProvider />} />
        <Route path="/skitschFinished" element={<SkitschFinished />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/expiredUrl" element={<ExpiredUrl />} />
        <Route path="/error" element={<Error />} />
        <Route path="/callback" element={<NaverRedirection />} />
        {/* <Route path="/백엔드에서 준 URI?" element={<KakaoRedirection />} /> */}
      </Routes>
    </div>
  );
}

export default App;
