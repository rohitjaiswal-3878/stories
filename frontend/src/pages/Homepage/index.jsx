import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import allIcon from "../../assets/all.png";
import medicalIcon from "../../assets/medical.png";
import fruitsIcon from "../../assets/fruits.png";
import worldIcon from "../../assets/world.png";
import indiaIcon from "../../assets/india.png";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import bookmarkIcon from "../../assets/bookmark.jpg";
import profileImg from "../../assets/profileImg.png";
import hamburger from "../../assets/hamburger.png";
import Stories from "../../components/Stories";

function Homepage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");
  const [menu, setMenu] = useState();
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

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setMenu(false);
  }, [location]);

  return (
    <div className={styles.homepage}>
      <div className={styles.navbar}>
        <div className={styles.buttons}>
          {!token ? (
            <div onClick={() => navigate("/register")}>Register Now</div>
          ) : (
            <div style={{ fontSize: "11px" }}>
              <img
                src={bookmarkIcon}
                alt=""
                style={{
                  width: "13px",
                  objectFit: "contain",
                  marginRight: "5px",
                }}
              />
              Bookmarks
            </div>
          )}
          {!token ? (
            <div className={styles.green} onClick={() => navigate("/login")}>
              Sign In
            </div>
          ) : (
            <div onClick={() => navigate("/create")}>Add story</div>
          )}

          {token && (
            <div className={styles.profileImg}>
              <img src={profileImg} alt="" />
            </div>
          )}

          {token && (
            <>
              <img
                className={styles.hamburger}
                src={hamburger}
                alt="menu"
                onClick={() => setMenu(!menu)}
              />
              {menu && (
                <div className={styles.menu}>
                  {localStorage.getItem("username")}
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      setToken("");
                      toast.success("Logged out successfully!");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
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

        <Stories>
          <span>Your Stories</span>
        </Stories>
      </div>
      <Toaster />
      <Outlet />
    </div>
  );
}

export default Homepage;
