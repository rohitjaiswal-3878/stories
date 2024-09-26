import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import MyModal from "../MyModal";
import { useNavigate, useOutletContext } from "react-router-dom";
import crossIcon from "../../assets/cross.jpg";
import toast from "react-hot-toast";
import { createStory } from "../../apis/story";
import { useOutlet } from "react-router-dom";

function CreateStory() {
  const navigate = useNavigate();
  const getData = useOutletContext();
  const [error, setError] = useState("");
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
  ]);
  const [selSlide, setSelSlide] = useState(0);
  const [loader, setLoader] = useState(false);

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

  // Sync react state with form state.
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
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

    if (err == 0) {
      setLoader(true);
      setError("");
      createStory(slides).then((res) => {
        if (res.status == "200") {
          toast.success(res.data.msg);
          setLoader(false);
          getData();
          navigate("/");
        } else {
          toast.error(res.data.msg);
        }
      });
    } else {
      const msg = `Please fill all details in slide number ${convertArrayToString(
        slideNo
      )}`;
      setError(msg);
    }
  };

  return (
    <MyModal>
      <div className={styles.container}>
        <span className={styles.heading}>Add upto 6 slides</span>

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
              <label htmlFor="">Heading:</label>
              <input
                type="text"
                placeholder="Your heading"
                name="heading"
                onChange={handleInput}
                value={slides[selSlide].heading}
              />
            </div>
            <div>
              <label htmlFor="">Description:</label>
              <textarea
                name="description"
                placeholder="Story Description"
                onChange={handleInput}
                value={slides[selSlide].description}
              ></textarea>
            </div>
            <div>
              <label htmlFor="">Image/video:</label>
              <input
                type="text"
                placeholder="Add Image/video url"
                name="imageURL"
                onChange={handleInput}
                value={slides[selSlide].imageURL}
              />
            </div>
            <div className={styles.category}>
              <label htmlFor="">Category:</label>
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

        <img
          src={crossIcon}
          alt="cross"
          className={styles.cross}
          onClick={() => navigate("/")}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </MyModal>
  );
}

export default CreateStory;
