import React, { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Cropper from "react-easy-crop";
import { withStyles } from "@material-ui/core/styles";
import { getCroppedImg } from "../crop/canvasUtils.js";
import { styles } from "../crop/styles.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFinalCroppedImage } from "../store.js";
import PrevNextButton from "../components/buttons/prev_next.js";
import ExplanationBox from "../components/others/explanationBox.js";
import BigLogo from "../components/buttons/bigLogo.js";
import axios from "axios";

const UploadImage = ({ classes }) => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log("done", { croppedImage });
      setCroppedImage(croppedImage);
      dispatch(setFinalCroppedImage(croppedImage));
    } catch (e) {
      console.error(e);
    }
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  // '이전' 버튼을 눌렀을 때 파일 선택창으로 돌아가기 위한 함수
  const onBack = () => {
    setCroppedImage(null);
    setImageSrc(null);
  };

  const sendImage = () => {
    const formData = new FormData();
    formData.append("file", croppedImage);

    axios
      .post("url", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("토큰 이름")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("이미지 전송 성공");
        navigate("/uploadImageSetting");
      })
      .catch((err) => {
        console.log("이미지 전송 오류: ", err);
      });
  };

  return (
    <div className="width-wrapper">
      <div className="container">
        <BigLogo />
        <ExplanationBox>설명</ExplanationBox>
        {croppedImage ? (
          <>
            <img
              src={croppedImage}
              alt="Cropped"
              style={{
                objectFit: "contain",
                width: "70%",
                marginTop: "7%",
              }}
            />
            <div className="prev-next-buttons">
              <PrevNextButton onClick={onBack}>이전</PrevNextButton>
              <PrevNextButton onClick={sendImage}>다음</PrevNextButton>
            </div>
          </>
        ) : imageSrc ? (
          <React.Fragment>
            <div className={classes.cropContainer}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={3 / 4}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="prev-next-buttons">
              <PrevNextButton onClick={onBack}>이전</PrevNextButton>
              <PrevNextButton
                onClick={showCroppedImage}
                classes={{ root: classes.cropButton }}
              >
                다음
              </PrevNextButton>
            </div>
          </React.Fragment>
        ) : (
          <>
            <label
              id="inputImage"
              style={{
                width: "70%",
                height: "50%",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              <input
                type="file"
                id="inputImage"
                onChange={onFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </label>
            <div className="prev-next-buttons">
              <PrevNextButton onClick={onBack}>이전</PrevNextButton>
              <PrevNextButton
                onClick={() => {
                  alert("사진을 넣어주세요.");
                }}
              >
                다음
              </PrevNextButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default withStyles(styles)(UploadImage); // withStyles로 컴포넌트를 래핑
