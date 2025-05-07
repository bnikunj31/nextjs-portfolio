const axios = require("axios");
const Cookies = require("js-cookie");

const token = Cookies.get("token");

export const getTechnology = async () => {
  try {
    const response = await axios.get("/api/technology");
    return response.data.technologies;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTechnologyById = async (id) => {
  try {
    const response = await axios.get(`/api/technology/${id}`);
    return response.data.technology;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addTechnology = async (formData) => {
  try {
    const response = await axios.post("/api/technology", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateTechnology = async (formData, id) => {
  try {
    const response = await axios.patch(`/api/technology/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTechnology = async (id) => {
  try {
    const response = await axios.delete(`/api/technology/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.message;
  } catch (error) {
    console.error(error);
  }
};
