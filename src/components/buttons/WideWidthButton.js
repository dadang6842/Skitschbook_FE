import styled from "styled-components";

const Button = styled.div`
  width: 80%;
  padding: 5%;
  margin-bottom: 5%;
  background-color: pink;
  cursor: pointer;
`;

function WideWidthButton({ children, onClick }) {
  return <Button onClick={onClick}>{children}</Button>;
}

export default WideWidthButton;
