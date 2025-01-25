const axios = require("axios");
const Cookies = require("js-cookie");

const token = Cookies.get("token");

export const fetchEnquiries = async () => {
  try {
    const response = await axios.get("/api/contact", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendEnquiry = async (formData) => {
  try {
    const response = await axios.post("/api/contact", formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteEnquiry = async (id) => {
  try {
    const response = await axios.delete(`/api/contact/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markAsRead = async (id) => {
  try {
    const response = await axios.patch(
      `/api/contact/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendReply = async (id, reply) => {
  try {
    const response = await axios.post(`/api/contact/${id}`, reply, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
