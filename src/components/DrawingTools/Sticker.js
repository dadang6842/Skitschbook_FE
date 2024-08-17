import styled from "styled-components";
import { Tab, Tabs } from "react-bootstrap";
import { useCanvas } from "../../pages/DrawSkitsch.js";
import { fabric } from "fabric";
import { useEffect } from "react";

const StickerContainer = styled.div`
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
  justify-content: flex-start; /* 탭 메뉴 상단 정렬 */
  align-items: center;
  overflow: scroll;
  overflow-x: hidden; /* 가로 스크롤 없애기 */
`;

const StickerImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* 여러 줄로 정렬될 수 있도록 설정 */
  width: 100%;
`;

const StickerImageSmall = styled.img`
  width: 5vw;
  height: auto;
  margin: 5px;
  display: inline-block;
`;

const StickerImageBig = styled.img`
  width: 20vw;
  height: auto;
  margin: 5px;
  display: inline-block;
`;

function Sticker(props) {
  const canvas = useCanvas();

  useEffect(() => {
    // 스티커 선택할 수 있게끔
    if (canvas) {
      canvas.isDrawingMode = false;
      canvas.selection = true;
      canvas.defaultCursor = "default";
    }
  }, [canvas]);

  const addSticker1 = (stickerName) => {
    fabric.Image.fromURL(
      `/img/stickers/sticker1/${stickerName}.png`,
      function (oImg) {
        oImg.scale(0.2).set("erasable", false); // 스티커 초기 크기 조정, 지워짐 방지
        canvas.add(oImg);
        canvas.setActiveObject(oImg); // 스티커를 추가한 후 선택 상태로 설정
        canvas.renderAll(); // 캔버스를 다시 렌더링하여 변경 사항 적용
      }
    );
  };

  const addSticker3 = (stickerName) => {
    fabric.Image.fromURL(
      `/img/stickers/sticker3/${stickerName}.png`,
      function (oImg) {
        oImg.scale(0.5).set("erasable", false); // 스티커 초기 크기 조정, 지워짐 방지
        canvas.add(oImg);
        canvas.setActiveObject(oImg); // 스티커를 추가한 후 선택 상태로 설정
        canvas.renderAll(); // 캔버스를 다시 렌더링하여 변경 사항 적용
      }
    );
  };

  const stickers1 = ["dolphin", "elephant", "lion", "tiger"];
  // 문법 공부
  const stickers3 = Array.from({ length: 6 }, (_, i) => `dinosaur${i + 1}`);

  return (
    <div>
      {props.isClicked ? (
        <StickerContainer>
          <Tabs
            defaultActiveKey="sticker1"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="sticker1" title="sticker1">
              <StickerImageContainer>
                {stickers1.map((stickerName) => (
                  <StickerImageSmall
                    key={stickerName}
                    src={`/img/stickers/sticker1/${stickerName}.png`}
                    alt={stickerName}
                    onClick={() => addSticker1(stickerName)}
                  />
                ))}
              </StickerImageContainer>
            </Tab>
            <Tab eventKey="sticker2" title="sticker2">
              Tab content for sticker2
            </Tab>
            <Tab eventKey="sticker3" title="sticker3">
              <StickerImageContainer>
                {stickers3.map((stickerName) => (
                  <StickerImageBig
                    key={stickerName}
                    src={`/img/stickers/sticker3/${stickerName}.png`}
                    alt={stickerName}
                    onClick={() => addSticker3(stickerName)}
                  />
                ))}
              </StickerImageContainer>
            </Tab>
            <Tab eventKey="sticker4" title="sticker4">
              Tab content for sticker4
            </Tab>
            <Tab eventKey="sticker5" title="sticker5">
              Tab content for sticker5
            </Tab>
          </Tabs>
        </StickerContainer>
      ) : null}
    </div>
  );
}

export default Sticker;
