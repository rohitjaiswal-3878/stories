import React from "react";
import styles from "./index.module.css";
import Story from "../../utils/Story";
import { useNavigate } from "react-router-dom";

function Stories({ children, seeMore, setSeeMore, section, stories, userId }) {
  const navigate = useNavigate();
  return (
    <div className={styles.topStories}>
      <h3>{children}</h3>
      <div
        className={styles.allStories}
        style={{
          flexWrap: seeMore ? "wrap" : "",
        }}
      >
        {!seeMore
          ? stories
              .filter((e, i) => i < 4)
              .map((story, index) => (
                <Story story={story} key={index} userId={userId} />
              ))
          : stories.map((story, index) => (
              <Story story={story} key={index} userId={userId} />
            ))}
      </div>

      <button
        className={styles.seeMore}
        onClick={() => {
          if (seeMore == section) {
            setSeeMore("");
          } else {
            setSeeMore(section);
          }
        }}
      >
        {seeMore ? "Go back" : "See more"}
      </button>
    </div>
  );
}

export default Stories;
