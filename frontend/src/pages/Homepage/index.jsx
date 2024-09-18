import React from "react";
import styles from "./index.module.css";
import allIcon from "../../assets/all.png";
import medicalIcon from "../../assets/medical.png";
import fruitsIcon from "../../assets/fruits.png";
import worldIcon from "../../assets/world.png";
import indiaIcon from "../../assets/india.png";
import { Outlet, useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const categories = [
    {
      title: "All",
      image: allIcon,
    },
    {
      title: "Medical",
      image: medicalIcon,
    },
    {
      title: "Fruits",
      image: fruitsIcon,
    },
    {
      title: "World",
      image: worldIcon,
    },
    {
      title: "India",
      image: indiaIcon,
    },
  ];

  return (
    <div className={styles.homepage}>
      <div className={styles.navbar}>
        <div className={styles.buttons}>
          <div onClick={() => navigate("/register")}>Register Now</div>
          <div className={styles.green} onClick={() => navigate("/login")}>
            Sign In
          </div>
        </div>
      </div>

      <div className={styles.stories}>
        <ul className={styles.categories}>
          {categories.map((category, index) => (
            <li key={index}>
              <img src={category.image} alt="" />
              <span>{category.title}</span>
            </li>
          ))}
        </ul>

        <div className={styles.topStories}>
          <h3>Top Stories About food</h3>
          <div className={styles.allStories}>
            <span>No stories Available</span>
          </div>
        </div>

        <div className={styles.topStories}>
          <h3>Top Stories About food</h3>
          <div className={styles.allStories}>
            <span>No stories Available</span>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default Homepage;
