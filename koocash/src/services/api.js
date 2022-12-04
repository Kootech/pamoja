import axios from "axios";

const BASE_URL = "http://127.0.0.1:9000";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

export const loginAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/token/`, data);
  return response.data;
};

export const getUser = async (userId) => {
  const response = await axiosInstance.get(`${BASE_URL}/api/user/${userId}`);
  return response.data;
};
