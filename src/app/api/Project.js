const axios = require("axios");
const Cookies = require("js-cookie");

const token = Cookies.get("token");

export const getProjects = async () => {
  try {
    const response = await axios.get("/api/post/");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await axios.get(`/api/post/${id}`, {
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

export const addProject = async (formData) => {
  try {
    const response = await axios.post("/api/post", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateProject = async (formData, id) => {
  try {
    const response = await axios.patch(`/api/post/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(`/api/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.message;
  } catch (error) {
    console.error(error);
  }
};
