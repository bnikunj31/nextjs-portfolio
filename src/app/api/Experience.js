const axios = require("axios");
const Cookies = require("js-cookie");

const token = Cookies.get("token");

export const getExperience = async () => {
  try {
    const response = await axios.get("/api/experience");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getExperienceById = async (id) => {
  try {
    const response = await axios.get(`/api/experience/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addExperience = async (formData) => {
  try {
    const response = await axios.post("/api/experience", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateExperience = async (formData, id) => {
  try {
    const response = await axios.patch(`/api/experience/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteExperience = async (id) => {
  try {
    const response = await axios.delete(`/api/experience/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.message;
  } catch (error) {
    console.error(error);
  }
};
