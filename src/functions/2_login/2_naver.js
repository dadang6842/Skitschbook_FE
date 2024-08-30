function naverLogin() {
  const clientID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const state = process.env.REACT_APP_NAVER_STATE_STRING;
  const callbackUrl = process.env.REACT_APP_NAVER_CALLBACK_URL;

  if (!clientID || !state || !callbackUrl) {
    console.error("Environment variables are missing.");
    return;
  }

  window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientID}&state=${state}&redirect_uri=${encodeURIComponent(callbackUrl)}`;
}

export default naverLogin;
