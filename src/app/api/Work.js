const axios = require("axios");
const Cookies = require("js-cookie");

const token = Cookies.get("token");

export const createWork = async (work) => {
  try {
    const response = await axios.post("/api/work", work, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWorks = async () => {
  try {
    const response = await axios.get("/api/work", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWorkById = async (id) => {
  try {
    const response = await axios.get(`/api/work/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateWork = async (id, formData) => {
  try {
    const response = await axios.patch(`/api/work/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWork = async (id) => {
  try {
    const response = await axios.delete(`/api/work/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
