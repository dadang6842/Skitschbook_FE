import styled from "styled-components";
import EraserBrushWidthSlider from "./EraserBrushWidthSlider";
import { useCanvas } from "../../pages/DrawSkitsch.js";
import { useEffect } from "react";
import { fabric } from "fabric";

const EraserContainer = styled.div`
  width: 100%;
  height: 20vh;
  position: absolute;
  left: 0;
  bottom: 10vh;
  background-color: grey;
  opacity: 0.8;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Eraser(props) {
  const canvas = useCanvas();

  useEffect(() => {
    if (canvas) {
      const eraserBrush = new fabric.EraserBrush(canvas); // 새 지우개 브러시 생성
      eraserBrush.width = 10;
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = eraserBrush; // 지우개 브러시 설정
      console.log("지우개 설정 완료");

      // return () => {
      //   canvas.isDrawingMode = false; // 컴포넌트 언마운트 시 펜 비활성화
      //   console.log("지우개 비활성화");
      // };
    } else {
      console.log("캔버스 없음");
    }
  }, [canvas]);

  return (
    <div>
      {props.isClicked ? (
        <EraserContainer>
          <EraserBrushWidthSlider />
        </EraserContainer>
      ) : null}
    </div>
  );
}

export default Eraser;
