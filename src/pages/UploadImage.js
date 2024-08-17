import React, { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { getOrientation } from "get-orientation/browser";
import { getCroppedImg } from "../crop/canvasUtils";
import { styles } from "../crop/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFinalCroppedImage } from "../store";
import PrevNextButton from "../components/buttons/prev_next";
import ExplanationBox from "../components/others/explanationBox";
import HomeButton from "../components/buttons/home.js";

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

  return (
    <div className="width-wrapper">
      <div className="container">
        {croppedImage ? (
          <>
            <HomeButton />
            <ExplanationBox>설명</ExplanationBox>
            <img
              src={croppedImage}
              alt="Cropped"
              style={{
                objectFit: "contain",
                width: "70%",
                marginTop: "7%",
              }} // 이미지 비율 유지하며 크기 설정
            />
            <div className="prev-next-buttons">
              <PrevNextButton onClick={onBack}>이전</PrevNextButton>
              <PrevNextButton onClick={() => navigate("/uploadImageSetting")}>
                다음
              </PrevNextButton>
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
            <div className={classes.controls}>
              <div className={classes.sliderContainer}>
                <Typography
                  variant="overline"
                  classes={{ root: classes.sliderLabel }}
                >
                  Zoom
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  classes={{ root: classes.slider }}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
              <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
                classes={{ root: classes.cropButton }}
              >
                Show Result
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <input type="file" onChange={onFileChange} accept="image/*" />
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
