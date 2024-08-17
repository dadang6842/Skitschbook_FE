import styled from "styled-components";

const Title = styled.div`
  width: 25%;
  background-color: #ced4da;
  position: absolute;
  top: 3%;
  left: 15%;
  padding: 3%;
`;

function PageTitle({ children }) {
  return <Title>{children}</Title>;
}

export default PageTitle;
