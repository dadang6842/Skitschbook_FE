import { useState, useEffect } from "react";
import Pen from "./Pen.js";
import Eraser from "./Eraser.js";
import Sticker from "./Sticker.js";
import Text from "./Text.js";
import { useCanvas } from "../../pages/DrawSkitsch.js";
import styled from "styled-components";

const DrawingToolContainer = styled.div`
  width: 100%;
  height: 10vh;
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: white;
`;

const DrawingTool = styled.div`
  background-color: pink;
  width: 16%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
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
        <DrawingTool onClick={() => handleToolClick("pen")}>그리기</DrawingTool>
        <DrawingTool onClick={() => handleToolClick("eraser")}>
          지우기
        </DrawingTool>
        <DrawingTool onClick={() => handleToolClick("sticker")}>
          스티커
        </DrawingTool>
        <DrawingTool onClick={() => handleToolClick("text")}>
          텍스트
        </DrawingTool>
        <DrawingTool onClick={undo}>실행취소</DrawingTool>
        <DrawingTool onClick={redo}>다시실행</DrawingTool>
      </DrawingToolContainer>
      {activeTool === "pen" && <Pen isClicked={isClicked} />}
      {activeTool === "eraser" && <Eraser isClicked={isClicked} />}
      {activeTool === "sticker" && <Sticker isClicked={isClicked} />}
      {activeTool === "text" && <Text isClicked={isClicked} />}
    </>
  );
}

export default DrawingToolBar;
