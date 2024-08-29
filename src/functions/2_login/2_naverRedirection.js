import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NaverRedirection() {
  const navigate = useNavigate();
  let params = new URL(window.location.href).searchParams;
  let code = params.get("code");
  let state = params.get("state");

  useEffect(() => {
    axios
      .post(`http://localhost:8080/api/auth/naver`, { code })
      .then((res) => {
        const token = res.data;
        localStorage.setItem("token", token);
        console.log("로그인 성공");
        navigate("/");
      })
      .catch((err) => console.log("로그인 실패", err));
  }, []);

  return <p>로딩중</p>;
}

export default NaverRedirection;
