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

function ViewStory() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.control}>
          <img src={lessIcon} alt="" />
        </div>
        <div className={styles.slides}>
          <ul className={styles.totalSlides}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
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
          <img src={storyImg} alt="" />
          <div className={styles.details}>
            <h2>Heading comes here</h2>
            <p>
              Inspirational designs, illustrations, and graphic elements from
              the world’s best designers.
            </p>
            <div className={styles.saveLike}>
              <img src={saveIcon} alt="" className={styles.save} />

              <div className={styles.heart}>
                <img src={whiteHeart} alt="" />
                <span>10</span>
              </div>
            </div>
          </div>
          <div className={styles.blackShadow}></div>
        </div>
        <div className={styles.control}>
          <img src={greatIcon} alt="" />
        </div>
      </div>
      <div className={styles.blackSpace}></div>
    </>
  );
}

export default ViewStory;
