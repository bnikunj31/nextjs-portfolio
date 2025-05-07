const axios = require("axios");
const Cookies = require("js-cookie");

const token = Cookies.get("token");

export const getSkills = async () => {
  try {
    const response = await axios.get("/api/skills");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSkillsById = async (id) => {
  try {
    const response = await axios.get(`/api/skills/${id}`, {
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

export const addSkill = async (formData) => {
  try {
    const response = await axios.post("/api/skills", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateSkill = async (formData, id) => {
  try {
    const response = await axios.patch(`/api/skills/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSkill = async (id) => {
  try {
    const response = await axios.delete(`/api/skills/${id}`);
    return response.data.message;
  } catch (error) {
    console.error(error);
  }
};
