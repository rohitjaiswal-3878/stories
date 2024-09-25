import React from "react";
import styles from "./index.module.css";
import Story from "../../utils/Story";

function Stories({ children }) {
  return (
    <div className={styles.topStories}>
      <h3>{children}</h3>
      <div className={styles.allStories}>
        <Story />
        <Story />
        <Story />
        <Story />
      </div>

      <button className={styles.seeMore}>See more</button>
    </div>
  );
}

export default Stories;
