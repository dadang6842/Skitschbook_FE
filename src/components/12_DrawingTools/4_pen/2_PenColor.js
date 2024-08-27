import styled from "styled-components";
import { useCanvas } from "../../../pages/12_drawSkitsch.js";

const ColorBox = styled.div`
  width: 5vw;
  height: 5vh;
  margin: 5px;
  display: inline-block;
  position: relative;
`;

function PenColor() {
  const canvas = useCanvas();
  const colors = ["red", "orange", "yellow", "green", "blue", "navy", "purple"];
  return (
    <div>
      {colors.map((color, index) => (
        <ColorBox
          key={index}
          style={{ backgroundColor: color }}
          onClick={() => {
            canvas.freeDrawingBrush.color = color;
          }}
        />
      ))}
    </div>
  );
}

export default PenColor;
