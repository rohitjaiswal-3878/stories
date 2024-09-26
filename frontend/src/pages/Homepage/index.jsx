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
import { getAllStories, getStoriesByCategory } from "../../apis/story";

function Homepage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");
  const [menu, setMenu] = useState();
  const [yourStories, setYourStories] = useState([]);
  const [seeMore, setSeeMore] = useState("");
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
  const [stories, setStories] = useState({});
  const [selCat, setSelCat] = useState(["all"]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setMenu(false);
  }, [location]);

  useEffect(() => {
    getData(); // Gets your stories.
  }, [selCat]);

  function getData() {
    if (localStorage.getItem("token")) {
      getAllStories()
        .then((res) => {
          setYourStories([...res.data]);
        })
        .catch((err) => {
          toast.error("Something went wrong while loading your stories!");
        });
    }
    getStoriesByCategory(selCat)
      .then((res) => {
        if (res.status == 200) {
          setStories(res.data);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  }

  const handleSelCat = (category) => {
    if (category == "all") {
      setSelCat(["all"]);
    } else {
      if (selCat.includes(category)) {
        let temp = selCat.filter((cat, index) => cat != category);
        if (temp.length == 0) {
          setSelCat(["all"]);
        } else {
          setSelCat([...temp]);
        }
      } else {
        let temp = selCat.filter((cat, index) => cat != "all");
        setSelCat([...temp, category]);
      }
    }
  };

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
                      setYourStories([]);
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
            <li
              key={index}
              onClick={() => handleSelCat(category.title.toLocaleLowerCase())}
              className={
                selCat.includes(category.title.toLocaleLowerCase())
                  ? styles.selCategory
                  : ""
              }
            >
              <img src={category.image} alt="" />
              <span>{category.title}</span>
            </li>
          ))}
        </ul>

        {yourStories.length != 0 && (seeMore == "your" || seeMore == "") && (
          <Stories
            stories={yourStories}
            seeMore={seeMore}
            section={"your"}
            setSeeMore={setSeeMore}
            userId={yourStories[0].userId}
          >
            <span>Your Stories</span>
          </Stories>
        )}

        {Object.keys(stories).map((cat, i) => {
          if (seeMore == cat || seeMore == "") {
            return (
              <Stories
                seeMore={seeMore}
                setSeeMore={setSeeMore}
                key={i}
                section={cat}
                stories={stories[cat]}
                userId={yourStories.length != 0 ? yourStories[0].userId : ""}
              >
                <span>Top Stories About {cat}</span>
              </Stories>
            );
          }
        })}
      </div>
      <Toaster />
      <Outlet context={getData} />
    </div>
  );
}

export default Homepage;
