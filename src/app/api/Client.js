const axios = require("axios");
const Cookies = require("js-cookie");

const token = Cookies.get("token");

export const createClient = async (client) => {
  try {
    const response = await axios.post("/api/client", client, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClients = async () => {
  try {
    const response = await axios.get("/api/client", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClientById = async (id) => {
  try {
    const response = await axios.get(`/api/client/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateClient = async (id, formData) => {
  try {
    const response = await axios.patch(`/api/client/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`/api/client/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
