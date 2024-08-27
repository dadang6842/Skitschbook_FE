import { useState, useEffect } from "react";
import Pen from "./4_pen/0_Pen.js";
import Eraser from "./5_eraser/0_Eraser.js";
import Sticker from "./6_sticker/0_Sticker.js";
import Text from "./7_text/0_Text.js";
import { useCanvas } from "../../pages/12_drawSkitsch.js";
import styled from "styled-components";

const DrawingToolContainer = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

const DrawingTool = styled.img`
  width: 16%;
  cursor: pointer;
`;

function DrawingToolBar() {
  const canvas = useCanvas();
  const [activeTool, setActiveTool] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [undoHistory, setUndoHistory] = useState([]); // 실행 취소를 위한 히스토리
  const [redoHistory, setRedoHistory] = useState([]); // 다시 실행을 위한 히스토리

  const handleToolClick = (tool) => {
    if (activeTool === tool) {
      setIsClicked(!isClicked);
    } else {
      setActiveTool(tool);
      setIsClicked(true);
    }
  };

  const undo = () => {
    if (canvas) {
      const objects = canvas.getObjects();
      if (objects.length > 0) {
        const poppedObject = objects[objects.length - 1];
        canvas.remove(poppedObject);

        // Undo를 했을 때 해당 객체를 redoHistory에 저장
        setUndoHistory((prev) => [...prev, poppedObject]);
        setRedoHistory([]); // 새로 Undo 했으므로 redo 히스토리는 초기화

        canvas.renderAll();
      }
    }
  };

  const redo = () => {
    if (canvas && undoHistory.length > 0) {
      const objectToRedo = undoHistory[undoHistory.length - 1];

      // Redo 했을 때 해당 객체를 undoHistory에서 제거하고 redoHistory에 저장
      setUndoHistory((prev) => prev.slice(0, -1));
      setRedoHistory((prev) => [...prev, objectToRedo]);

      canvas.add(objectToRedo);
      canvas.renderAll();
    }
  };

  useEffect(() => {
    // 왜 erase나 스티커 옮기는 건 undo, redo가 안 될까?
    if (canvas) {
      const saveHistory = () => {
        setRedoHistory([]); // 새로운 작업이 발생하면 redo 히스토리를 초기화
      };

      canvas.on("object:added", saveHistory);
      canvas.on("object:modified", saveHistory);
      canvas.on("object:removed", saveHistory);

      return () => {
        canvas.off("object:added", saveHistory);
        canvas.off("object:modified", saveHistory);
        canvas.off("object:removed", saveHistory);
      };
    }
  }, [canvas]);

  return (
    <>
      <DrawingToolContainer>
        <DrawingTool
          src="/img/12/4_pen.png"
          onClick={() => handleToolClick("pen")}
        />
        <DrawingTool
          src="/img/12/5_eraser.png"
          onClick={() => handleToolClick("eraser")}
        />
        <DrawingTool
          src="/img/12/6_sticker.png"
          onClick={() => handleToolClick("sticker")}
        />
        <DrawingTool
          src="/img/12/7_text.png"
          onClick={() => handleToolClick("text")}
        />
        <DrawingTool src="/img/12/8_undo.png" onClick={undo} />
        <DrawingTool src="/img/12/9_redo.png" onClick={redo} />
      </DrawingToolContainer>
      {activeTool === "pen" && <Pen isClicked={isClicked} />}
      {activeTool === "eraser" && <Eraser isClicked={isClicked} />}
      {activeTool === "sticker" && <Sticker isClicked={isClicked} />}
      {activeTool === "text" && <Text isClicked={isClicked} />}
    </>
  );
}

export default DrawingToolBar;
