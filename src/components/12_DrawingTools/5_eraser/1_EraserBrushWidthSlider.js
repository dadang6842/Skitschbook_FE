import styled from "styled-components";
import { useCanvas } from "../../../pages/12_drawSkitsch.js";
import { useState } from "react";

const EraserSlider = styled.input`
  display: block;
`;

function EraserBrushWidthSlider() {
  const [value, setValue] = useState(10);
  const canvas = useCanvas();

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    // 슬라이더 값 문자열로 반환되기 때문에 parseInt를 사용하여 숫자로 변환
    if (canvas) canvas.freeDrawingBrush.width = parseInt(newValue, 10);
  };

  return (
    <div>
      <h4>Brush Width: {value}</h4>
      <EraserSlider
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default EraserBrushWidthSlider;
