const toast = require("react-hot-toast");
const axios = require("axios");

exports.login = async (formData) => {
  try {
    const response = await axios.post(
      "/api/users/",
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error", error);
    toast.error("Failed to fetch skills");
  }
};
