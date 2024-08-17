import styled from "styled-components";

const Button = styled.button`
  width: 40%;
  padding: 5%;
  background-color: pink;
  text-align: center;
`;

function PrevNextButton({ children, onClick }) {
  return (
    <>
      <Button onClick={onClick}>{children}</Button>
    </>
  );
}

export default PrevNextButton;
