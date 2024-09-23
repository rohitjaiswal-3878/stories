import axios from "axios";

const registerUser = async (formData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND}/auth/register`,
      { ...formData }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export { registerUser };
