import React, { useState, useCallback } from "react";
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

const UploadImageFlow = ({ classes }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [canAllUserSkitsch, setCanAllUsersSkitch] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // 1: 이미지 업로드, 2: 설정
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
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

  const onBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1); // 설정 단계에서 이미지 업로드 단계로 돌아가기
    } else {
      setCroppedImage(null);
      setImageSrc(null);
    }
  };

  const sendFinalRequest = async () => {
    if (!croppedImage) {
      alert("이미지가 잘못되었습니다.");
      return;
    }

    try {
      const blob = await fetch(croppedImage).then((res) => res.blob());
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");
      formData.append("canAllUserSkitsch", canAllUserSkitsch); // 사용자 설정 추가

      await axios.post("http://localhost:8080/skitsche/save", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("이미지 및 사용자 설정 전송 성공");
      navigate("/uploadImageFinished");
    } catch (err) {
      console.error("최종 요청 오류: ", err);
    }
  };

  return (
    <div className="width-wrapper">
      <div className="container">
        <BigLogo />
        <ExplanationBox>
          {currentStep === 1 ? "이미지 업로드" : "누가 스키치 가능?"}
        </ExplanationBox>

        {currentStep === 1 ? (
          // 이미지 업로드 및 크롭 단계
          <>
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
                  <PrevNextButton onClick={() => setCurrentStep(2)}>다음</PrevNextButton>
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
          </>
        ) : (
          // 사용자 설정 단계
          <>
            <button onClick={() => setCanAllUsersSkitch(true)}>
              누구나 스키치할 수 있게 하기
            </button>
            <button onClick={() => setCanAllUsersSkitch(false)}>
              로그인한 사람만 스키치할 수 있게 하기
            </button>
            <div className="prev-next-buttons">
              <PrevNextButton onClick={() => setCurrentStep(1)}>이전</PrevNextButton>
              <PrevNextButton onClick={sendFinalRequest}>
                완료
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

export default withStyles(styles)(UploadImageFlow);
