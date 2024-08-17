import styled from "styled-components";

function TextFontFamily(props) {
  const fontFamily = [
    "Times New Roman",
    "Arial",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
  ];
  return (
    <div>
      {fontFamily.map((font, index) => (
        <div
          key={index}
          style={{ fontFamily: font, display: "inlineBlock" }}
          onClick={() => {
            props.setFontFamily(font);
          }}
        >
          {font}
        </div>
      ))}
    </div>
  );
}

export default TextFontFamily;
