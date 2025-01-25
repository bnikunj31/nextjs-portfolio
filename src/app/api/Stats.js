import axios from "axios";

export const clientCount = async () => {
  try {
    const response = await axios.get("/api/count/client");
    return response.data.count;
  } catch (error) {
    throw error;
  }
};

export const projectCount = async () => {
  try {
    const response = await axios.get("/api/count/project");
    return response.data.count;
  } catch (error) {
    throw error;
  }
};
