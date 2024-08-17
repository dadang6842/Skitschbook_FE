import styled from "styled-components";

const Button = styled.div`
    width: 10%;
    padding; 7%;
    position: absolute;
    bottom: 3%;
    left: 3%;
    background-color: pink;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function SNSButton() {
  const url = "https://www.instagram.com";

  return (
    <Button
      onClick={() => {
        window.open(url);
      }}
    >
      SNS
    </Button>
  );
}

export default SNSButton;
