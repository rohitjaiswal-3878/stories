import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { getBookmark } from "../../apis/data";
import Slide from "../../utils/Slide";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bookmarkIcon from "../../assets/bookmark.jpg";
import profileImg from "../../assets/profileImg.png";
import hamburger from "../../assets/hamburger.png";
import CreateStory from "../../components/CreateStory";

function Bookmark() {
  const [slides, setSlides] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(""); // Store the token.
  const [menu, setMenu] = useState(); // Store the state of hamburger.

  const [currentState, setCurrentState] = useState({
    login: false,
    register: false,
    create: false,
  });

  // Checks for token.
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setMenu(false);
  }, [currentState]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getBookmark().then((res) => {
        if (res.status == 200) {
          setSlides([...res.data]);
        } else {
          toast.error("Something went wrong while loading bookmarks!");
        }
      });
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className={styles.container}>
      {/* Navbar of homepage. */}
      <div className={styles.navbar}>
        <div className={styles.buttons}>
          {!token ? (
            <div
              onClick={() =>
                setCurrentState({
                  login: false,
                  register: true,
                  create: false,
                })
              }
            >
              Register Now
            </div>
          ) : (
            <div
              style={{ fontSize: "11px" }}
              onClick={() => {
                navigate("/bookmark");
              }}
            >
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
            <div
              className={styles.green}
              onClick={() =>
                setCurrentState({
                  login: true,
                  register: false,
                  create: false,
                })
              }
            >
              Sign In
            </div>
          ) : (
            <div
              onClick={() =>
                setCurrentState({
                  login: false,
                  register: false,
                  create: true,
                })
              }
            >
              Add story
            </div>
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
                      navigate("/");
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

      <div className={styles.allStories}>
        {slides.map((slide, index) => (
          <Slide slide={slide.slide} key={index} storyId={slide.storyId} />
        ))}
      </div>

      {currentState.create && <CreateStory setCurrentState={setCurrentState} />}
    </div>
  );
}

export default Bookmark;
