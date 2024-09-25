import React from "react";
import styles from "./index.module.css";
import storyImg from "../assets/story.png";
import editImg from "../assets/edit.png";

function Story() {
  return (
    <div className={styles.story}>
      <img src={storyImg} alt="Story image" />
      <div className={styles.details}>
        <h2>Heading comes here</h2>
        <p>
          Inspirational designs, illustrations, and graphic elements from the
          world’s best designers.
        </p>
      </div>

      <div className={styles.edit}>
        <img src={editImg} alt="" /> <span>Edit</span>
      </div>
      <div className={styles.blackShadow}></div>
    </div>
  );
}

export default Story;
