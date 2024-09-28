import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyModal from "../MyModal";
import { getStory, updateStory } from "../../apis/story";
import toast from "react-hot-toast";
import crossIcon from "../../assets/cross.jpg";
import styles from "../CreateStory/index.module.css";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function EditStory() {
  const navigate = useNavigate();
  const { getData } = useOutletContext();
  const { storyId } = useParams();
  const [error, setError] = useState(""); // Store error
  const [slides, setSlides] = useState(-1); // Store slides state.
  const [selSlide, setSelSlide] = useState(0); // Keep track of selected slide.
  const [loader, setLoader] = useState(false); // Store state of loader.

  useEffect(() => {
    getStory(storyId).then((res) => {
      if (res.status == 200) {
        setSlides([...res.data.slides]);
      } else {
        toast.error("Story didn't load!");
      }
    });
  }, []);

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

    if (err == 0) {
      setLoader(true);
      setError("");
      updateStory(storyId, slides).then((res) => {
        if (res.status == 200) {
          setLoader(false);
          getData();
          toast.success(res.data.msg);
          navigate("/");
        } else {
          console.log(err);
          toast.error("Something went wrong in updation process!");
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
        {/* All slides */}
        <div className={styles.slides}>
          <ul>
            {slides != -1 &&
              slides.map((slide, index) => (
                <li
                  className={styles.slide}
                  key={index}
                  style={{
                    border: selSlide == index ? "1.5px solid #73ABFF" : "",
                  }}
                  onClick={() => setSelSlide(index)}
                >
                  <span>Slide {index + 1}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* Slide content */}
        <div className={styles.slideData}>
          {slides != -1 && (
            <form>
              <div>
                <label>Heading:</label>
                <input
                  type="text"
                  placeholder="Your heading"
                  name="heading"
                  onChange={handleInput}
                  value={slides[selSlide].heading}
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  name="description"
                  placeholder="Story Description"
                  onChange={handleInput}
                  value={slides[selSlide].description}
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
                />
              </div>
              <div className={styles.category}>
                <label>Category:</label>
                <div>
                  <select
                    defaultValue={slides[selSlide].category}
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
          )}
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
            {loader ? <div className="loader"></div> : "Update"}
          </button>
        </div>

        {/* Close create story modal. */}
        <img
          src={crossIcon}
          alt="cross"
          className={styles.cross}
          onClick={() => {
            if (!loader) {
              navigate("/");
            }
          }}
        />

        {/* Error */}
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </MyModal>
  );
}

export default EditStory;
