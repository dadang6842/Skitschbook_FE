function naverLogin() {
  const clientID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const stateString = process.env.REACT_APP_NAVER_STATE_STRING;
  const callbackUrl = process.env.REACT_APP_NAVER_CALLBACK_URL;

  window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientID}&state=${stateString}&redirect_uri=${callbackUrl}`;
}

export default naverLogin;
