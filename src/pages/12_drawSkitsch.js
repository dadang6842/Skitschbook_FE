import React, {
  useEffect,
  useRef,
  createContext,
  useContext,
  useState,
} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { fabric } from "fabric";
import DrawingToolBar from "../components/12_DrawingTools/DrawingToolBar.js";
import EndButton from "../components/buttons/end.js";
import SkitschNameBox from "../components/others/skitschName.js";
import SmallLogo from "../components/buttons/smallLogo.js";

const CanvasContext = createContext(null);

function DrawSkitsch() {
  // 실시간 처리 메서드 작성 필요
  const canvasRef = useRef(null); // useRef로 canvas 요소 참조
  const canvasContainerRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const finalCroppedImage = useSelector((state) => state.finalCroppedImage);

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    // 캔버스 생성
    const newCanvas = new fabric.Canvas(canvasRef.current);
    newCanvas.setDimensions({
      width: canvasContainer.offsetWidth,
      height: (canvasContainer.offsetWidth * 4) / 3,
    });
    setCanvas(newCanvas);

    newCanvas.on("mouse:wheel", function (opt) {
      const delta = opt.e.deltaY;
      let zoom = newCanvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      newCanvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    // 언마운트 시 캔버스 정리
    return () => {
      newCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvas && finalCroppedImage) {
      fabric.Image.fromURL(finalCroppedImage, (img) => {
        // 이미지의 크기를 캔버스 크기에 맞게 조정
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);
        img.set("erasable", false);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    }
  }, [canvas, finalCroppedImage]);

  useEffect(() => {
    const interval = setInterval(() => {
      const saveCanvas = canvas.toObject(); // 캔버스에 있는 객체들을 객체 형태로 변환
      const saveCanvasString = JSON.stringify(saveCanvas); // 객체를 JSON 문자열로 변환
      axios
        .post("url", saveCanvasString, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("토큰 이름")}`,
          },
        })
        .then(() => console.log("캔버스 저장 성공"))
        .catch((err) => console.log("캔버스 저장 실패", err));
    }, 30000); // 30초마다 서버로 캔버스 내용 전송

    return () => clearInterval(interval);
  }, []);

  return (
    <CanvasContext.Provider value={canvas}>
      <div className="width-wrapper">
        <div className="container" ref={canvasContainerRef}>
          <SmallLogo />
          <SkitschNameBox />
          {/* 본인의 url 접속 시에만 EndButton 출력 */}
          <EndButton />
          <canvas
            id="fabricCanvas"
            ref={canvasRef}
            style={{
              border: "1px solid red",
            }}
          />
          <DrawingToolBar />
        </div>
      </div>
    </CanvasContext.Provider>
  );
}

export default DrawSkitsch;
export const useCanvas = () => useContext(CanvasContext);
