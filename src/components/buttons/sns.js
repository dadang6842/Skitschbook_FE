import styled from "styled-components";

const Button = styled.img`
  width: 8%;
  position: absolute;
  bottom: 2%;
  cursor: pointer;

  &:nth-child(5) {
    left: 3%;
  }

  &:nth-child(6) {
    left: 13%;
  }
`;

function SNSButton(props) {
  const url = props.url;
  const src = props.src;

  return (
    <Button
      src={src}
      onClick={() => {
        window.open(url);
      }}
    />
  );
}

export default SNSButton;
