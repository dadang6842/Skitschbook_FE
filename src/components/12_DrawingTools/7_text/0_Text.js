import styled from "styled-components";
import { fabric } from "fabric";
import { useEffect, useState } from "react";
import TextColor from "./1_TextColor.js";
import TextFontFamily from "./2_TextFontFamily.js";
import { useCanvas } from "../../../pages/12_drawSkitsch.js";

const TextContainer = styled.div`
  width: 100%;
  height: 30vh;
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

function Text(props) {
  const canvas = useCanvas();
  const [text, setText] = useState(""); // 텍스트를 저장해야 하는지?
  const [fontFamily, setFontFamily] = useState("Times New Roman");
  const [color, setColor] = useState("black");

  useEffect(() => {
    if (props.isClicked) {
      let textbox = new fabric.Textbox(text, {
        left: 50,
        top: 50,
        width: 200,
        fontFamily: fontFamily,
        fill: color,
        textAlign: "center",
        editable: true,
      });
      canvas.add(textbox).setActiveObject(textbox);
    }
  }, [props.isClicked]);

  useEffect(() => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.set) {
      activeObject.set("fill", color);
      canvas.renderAll();
    }
  }, [color, canvas]);

  useEffect(() => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.set) {
      activeObject.set("fontFamily", fontFamily);
      canvas.renderAll();
    }
  }, [fontFamily, canvas]);

  const deleteTextBox = () => {
    canvas.remove(canvas.getActiveObject());
    canvas.renderAll();
  };

  return (
    <div>
      {props.isClicked ? (
        <TextContainer>
          <TextColor setColor={setColor} />
          <TextFontFamily setFontFamily={setFontFamily} />
          <button
            onClick={() => {
              deleteTextBox();
            }}
          >
            텍스트 삭제
          </button>
        </TextContainer>
      ) : null}
    </div>
  );
}

export default Text;
