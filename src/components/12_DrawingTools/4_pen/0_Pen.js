import { useEffect } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import { useCanvas } from "../../../pages/12_drawSkitsch.js";
import PenColor from "./2_PenColor.js";
import PenBrushWidthSlider from "./1_PenBrushWidthSlider.js";

const PenContainer = styled.div`
  width: 100%;
  height: 50vh;
  position: absolute;
  left: 0;
  bottom: 10vh;
  background-color: grey;
  opacity: 0.8;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Pen(props) {
  const canvas = useCanvas();

  useEffect(() => {
    if (canvas) {
      const penBrush = new fabric.PencilBrush(canvas); // 새 펜 브러시 생성
      penBrush.width = 10;
      penBrush.color = "black";
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = penBrush; // 펜 브러시 설정
      console.log("펜 설정 완료");
      //   return () => {
      //     canvas.isDrawingMode = false; // 컴포넌트 언마운트 시 펜 비활성화
      //     console.log("펜 비활성화");
      //   };
    } else {
      console.log("캔버스 없음");
    }
  }, [canvas]);

  return (
    <div>
      {props.isClicked ? (
        <PenContainer>
          <PenBrushWidthSlider />
          <PenColor />
        </PenContainer>
      ) : null}
    </div>
  );
}

export default Pen;
