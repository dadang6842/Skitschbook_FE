import styled from "styled-components";

const ColorBox = styled.div`
  width: 5vw;
  height: 5vh;
  margin: 5px;
  display: inline-block;
  position: relative;
`;

function TextColor(props) {
  const colors = ["red", "orange", "yellow", "green", "blue", "navy", "purple"];
  return (
    <div>
      {colors.map((color, index) => (
        <ColorBox
          key={index}
          style={{ backgroundColor: color }}
          onClick={() => {
            props.setColor(color);
          }}
        />
      ))}
    </div>
  );
}

export default TextColor;
