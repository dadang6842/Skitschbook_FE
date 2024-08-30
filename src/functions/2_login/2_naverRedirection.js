import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NaverRedirection() {
  const navigate = useNavigate();
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    const state = params.get("state");

  useEffect(() => {
    const sendAuthRequest = async () => {
      if (code && state) {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/auth/naver",
            { code, state },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          const token = response.data.accessToken;
          localStorage.setItem("accessToken", token);
          console.log("로그인 성공");
          navigate("/");  // 홈 페이지로 리다이렉트
        } catch (err) {
          console.error("로그인 실패", err);
        }
      }
    };
    sendAuthRequest();
  }, [code, state, navigate]);

  return <p>로딩중...</p>;
}

export default NaverRedirection;
