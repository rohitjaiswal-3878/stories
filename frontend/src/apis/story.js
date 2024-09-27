import axios from "axios";

// Create story
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

// Get story created by logged in user.
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

// Gets story by story id and slide id.
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

// Filter story by categories.
const getStoriesByCategory = async (selCat) => {
  try {
    const filter = selCat.join(",");
    const response = await axios.get(
      `
      ${import.meta.env.VITE_APP_BACKEND}/story/stories/${filter}
      `,
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

export {
  createStory,
  getAllStories,
  getStoryByIdAndSlide,
  getStoriesByCategory,
};
