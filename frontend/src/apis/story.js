import axios from "axios";

const createStory = async (slides) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND}/story/create`,
      {
        slides,
      },
      {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      }
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

const getAllStories = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/story/all`,
      {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

const getStoryByIdAndSlide = async (storyId, slideId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/story/${storyId}/slide/${slideId}`,
      {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      }
    );

    return response;
  } catch (error) {
    return error.response;
  }
};
export { createStory, getAllStories, getStoryByIdAndSlide };
