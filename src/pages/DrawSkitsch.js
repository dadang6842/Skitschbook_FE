import React, {
  useEffect,
  useRef,
  createContext,
  useContext,
  useState,
} from "react";
import DrawingToolBar from "../components/DrawingTools/DrawingToolBar.js";
import { useSelector } from "react-redux";
import HomeButton from "../components/buttons/home.js";
import EndButton from "../components/buttons/end.js";
import SkitschNameBox from "../components/others/skitschName.js";
import { fabric } from "fabric";

const CanvasContext = createContext(null);

function DrawSkitsch() {
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
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    }
  }, [canvas, finalCroppedImage]);

  return (
    <CanvasContext.Provider value={canvas}>
      <div className="width-wrapper">
        <div className="container" ref={canvasContainerRef}>
          <HomeButton />
          <SkitschNameBox />
          {/* 본인의 url 접속 시에만 EndButton 출력 */}
          <EndButton />

          <canvas
            id="fabricCanvas"
            ref={canvasRef} // useRef로 참조 연결
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
