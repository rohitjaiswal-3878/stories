import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import MyModal from "../MyModal";
import { useNavigate, useOutletContext } from "react-router-dom";
import crossIcon from "../../assets/cross.jpg";
import toast from "react-hot-toast";
import { createStory } from "../../apis/story";

function CreateStory({ setCurrentState }) {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [error, setError] = useState(""); // Store error
  const [slides, setSlides] = useState([
    {
      heading: "",
      description: "",
      imageURL: "",
      category: "",
    },
    {
      heading: "",
      description: "",
      imageURL: "",
      category: "",
    },
    {
      heading: "",
      description: "",
      imageURL: "",
      category: "",
    },
  ]); // Store slides state.
  const [selSlide, setSelSlide] = useState(0); // Keep track of selected slide.
  const [loader, setLoader] = useState(false); // Store state of loader.
  const [videoError, setVideoError] = useState([]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Checks for token.
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  // Handle add slide functionality.
  const handleAddSlide = () => {
    if (slides.length < 6) {
      slides.push({
        heading: "",
        description: "",
        imageURL: "",
        category: slides[0].category,
      });
      setSlides([...slides]);
    }
  };

  // Handle close slide functionality.
  const handleCloseSlide = (e, index) => {
    e.stopPropagation();
    const newSlides = slides.filter((e, i) => i != index);
    if (selSlide == index) {
      setSelSlide(index - 1);
    }
    setSlides(newSlides);
  };

  // Converts number array to comman separated string.
  function convertArrayToString(a) {
    let b = "";

    if (a.length == 1) {
      return a[0] + ".";
    }
    a.forEach((e, i) => {
      if (i == a.length - 1) {
        b += "and " + e + ".";
      } else {
        b += e + ", ";
      }
    });
    return b;
  }

  // Validate image url.
  function validateImageUrl(url, callback) {
    const img = new Image();
    img.src = url;

    img.onload = function () {
      callback(true);
    };

    img.onerror = function () {
      callback(false);
    };
  }

  // Validate video duration.
  function validateVideoUrl(url, callback) {
    const video = document.createElement("video");

    video.src = url;
    video.preload = "metadata";

    video.onloadedmetadata = function () {
      const durationInSeconds = video.duration;
      if (durationInSeconds <= 15) {
        callback(true, "");
      } else {
        callback(false, "Video duration should be less than 15sec");
      }
    };
    video.onerror = function () {
      callback(false, "Invalid URL");
    };
  }
  // Sync react state with form state.
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "imageURL") {
      validateImageUrl(value, (imageValid) => {
        if (!imageValid) {
          validateVideoUrl(value, (valid, msg) => {
            if (valid) {
              videoError[selSlide] = "";
            } else {
              videoError[selSlide] = msg + " in slide " + (selSlide + 1);
            }
            setVideoError(videoError);
          });
        } else {
          videoError[selSlide] = "";
          setVideoError(videoError);
        }
      });
    }
    if (name == "category") {
      slides.map((slide, index) => (slide.category = value));
      setSlides([...slides]);
    } else {
      slides[selSlide][name] = value;
      setSlides([...slides]);
    }
  };

  // Handle post story functionality.
  const handlePost = (e) => {
    let err = 0;
    let slideNo = [];

    // Checks whether any field in slides are empty or not.
    slides.map((slide, index) => {
      if (
        slide.heading == "" ||
        slide.description == "" ||
        slide.imageURL == "" ||
        slide.category == ""
      ) {
        slideNo.push(index + 1);
        err++;
      }
    });

    let urlError = 0;
    videoError.forEach((ele) => {
      if (ele != "") {
        urlError++;
      }
    });

    if (err == 0 && urlError == 0) {
      setLoader(true);
      setVideoError([]);
      setError("");
      createStory(slides).then((res) => {
        if (res.status == "200") {
          toast.success(res.data.msg);
          setLoader(false);
          setCurrentState({
            login: false,
            register: false,
            create: false,
          });
        } else {
          toast.error(res.data.msg);
        }
      });
    } else {
      let msg = "";
      if (slideNo.length != 0) {
        msg = `Please fill all details in slide number ${convertArrayToString(
          slideNo
        )}`;
      } else {
        videoError.forEach((ele, index) => {
          if (ele != "") {
            if (index == videoError.length - 1) {
              msg += "and " + ele + ".";
            } else {
              msg += ele + ", ";
            }
          }
        });
      }

      setError(msg);
    }
  };

  return (
    <MyModal>
      <div className={styles.container}>
        <span className={styles.heading}>Add upto 6 slides</span>
        {width < 769 && (
          <h3 className={styles.respHeading}>Add story to feed</h3>
        )}
        {/* All slides */}
        <div className={styles.slides}>
          <ul>
            {slides.map((slide, index) => (
              <li
                className={styles.slide}
                key={index}
                style={{
                  border: selSlide == index ? "1.5px solid #73ABFF" : "",
                }}
                onClick={() => setSelSlide(index)}
              >
                <span>Slide {index + 1}</span>
                {index > 2 && (
                  <span
                    className={styles.closeSlide}
                    onClick={(e) => handleCloseSlide(e, index)}
                  >
                    x
                  </span>
                )}
              </li>
            ))}
          </ul>
          {slides.length < 6 && (
            <div className={styles.addSlide} onClick={handleAddSlide}>
              Add+
            </div>
          )}
        </div>

        {/* Slide content */}
        <div className={styles.slideData}>
          <form>
            <div>
              <label>Heading:</label>
              <input
                type="text"
                placeholder="Your heading"
                name="heading"
                onChange={handleInput}
                value={slides[selSlide].heading}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                placeholder="Story Description"
                onChange={handleInput}
                value={slides[selSlide].description}
                autoComplete="off"
              ></textarea>
            </div>
            <div>
              <label>Image/video:</label>
              <input
                type="text"
                placeholder="Add Image/video url"
                name="imageURL"
                onChange={handleInput}
                value={slides[selSlide].imageURL}
                autoComplete="off"
              />
            </div>
            <div className={styles.category}>
              <label>Category:</label>
              <div>
                <select
                  defaultValue={"default"}
                  name="category"
                  onChange={handleInput}
                >
                  <option value="default" disabled>
                    Select Category
                  </option>
                  <option value="medical">Medical</option>
                  <option value="fruits">Fruits</option>
                  <option value="world">World</option>
                  <option value="india">India</option>
                  <option value="education">Education</option>
                </select>
                <span>This field will be common for all slides</span>
              </div>
            </div>
          </form>
        </div>

        {/* Previous, next and post. */}
        <div className={styles.buttons}>
          <div className={styles.prevNext}>
            <button
              style={{ backgroundColor: "#7EFF73" }}
              onClick={() => {
                if (selSlide - 1 >= 0) {
                  setSelSlide(selSlide - 1);
                }
              }}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#73ABFF" }}
              onClick={() => {
                if (slides.length > selSlide + 1) {
                  setSelSlide(selSlide + 1);
                }
              }}
            >
              Next
            </button>
          </div>
          <button
            style={{ backgroundColor: "#FF7373" }}
            onClick={handlePost}
            disabled={loader}
          >
            {loader ? <div className="loader"></div> : "Post"}
          </button>
        </div>

        {/* Close create story modal. */}
        <img
          src={crossIcon}
          alt="cross"
          className={styles.cross}
          onClick={() =>
            setCurrentState({
              login: false,
              register: false,
              create: false,
            })
          }
        />

        {/* Error */}
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </MyModal>
  );
}

export default CreateStory;
