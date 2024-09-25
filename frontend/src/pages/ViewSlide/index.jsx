import React from "react";
import styles from "./index.module.css";
import storyImg from "../../assets/story.png";
import saveIcon from "../../assets/save.png";
import whiteHeart from "../../assets/white.png";
import redHeart from "../../assets/red.png";
import crossIcon from "../../assets/cross.png";
import shareIcon from "../../assets/share.png";
import lessIcon from "../../assets/less.png";
import greatIcon from "../../assets/great.png";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getStoryByIdAndSlide } from "../../apis/story";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import video from "../../assets/video1.mp4";
import { useRef } from "react";

function ViewStory() {
  const { id, slideId } = useParams();
  const [storyInfo, setStoryInfo] = useState({});
  const [visitIndex, setVisitIndex] = useState(-1);
  const loadOnce = useRef(true);

  useEffect(() => {
    if (loadOnce.current) {
      getStoryByIdAndSlide(id, slideId)
        .then((res) => {
          setStoryInfo({ ...res.data });
          setVisitIndex(res.data.visitIndex);
          loadOnce.current = false;
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    }

    // if (Object.keys(storyInfo).length != 0) {
    //   let timeout;
    //   if (visitIndex < storyInfo.slides.length - 1) {
    //     timeout = setTimeout(() => {
    //       setVisitIndex(visitIndex + 1);
    //     }, 3000);
    //   }
    // }
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.control}
          onClick={() => {
            if (visitIndex >= 1) {
              setVisitIndex(visitIndex - 1);
            }
          }}
        >
          <img src={lessIcon} alt="" />
        </div>
        <div className={styles.slides}>
          <ul className={styles.totalSlides}>
            {Object.keys(storyInfo).length != 0 &&
              storyInfo.slides.map((slide, index) => (
                <li
                  key={index}
                  style={{
                    borderColor: index <= visitIndex ? "white" : "#D9D9D980",
                  }}
                ></li>
              ))}
          </ul>

          <div className={styles.crossShare}>
            <img
              src={crossIcon}
              alt="cross icon"
              className={styles.cross}
              onClick={() => navigate("/")}
            />
            <img src={shareIcon} alt="share icon" />
          </div>

          {Object.keys(storyInfo).length == 0 ? (
            "Loading..."
          ) : (
            <>
              {storyInfo.slides[visitIndex].imageURL.match(
                /(\.mp4|\.3gp|\.webm)/
              ) ? (
                <video
                  src={storyInfo.slides[visitIndex].imageURL}
                  autoPlay
                  muted
                ></video>
              ) : (
                <img src={storyInfo.slides[visitIndex].imageURL} alt="" />
              )}

              <div className={styles.details}>
                <h2>{storyInfo.slides[visitIndex].heading}</h2>
                <p>{storyInfo.slides[visitIndex].description}</p>
                <div className={styles.saveLike}>
                  <img src={saveIcon} alt="" className={styles.save} />

                  <div className={styles.heart}>
                    <img src={whiteHeart} alt="" />
                    <span>10</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className={styles.blackShadow}></div>
        </div>
        <div
          className={styles.control}
          onClick={() => {
            if (visitIndex < storyInfo.slides.length - 1) {
              setVisitIndex(visitIndex + 1);
            }
          }}
        >
          <img src={greatIcon} alt="" />
        </div>
      </div>
      <div className={styles.blackSpace}></div>
    </>
  );
}

export default ViewStory;
