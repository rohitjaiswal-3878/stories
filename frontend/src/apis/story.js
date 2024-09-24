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

export { createStory };
