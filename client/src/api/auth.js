import axios from "./axios";

export const registerRequest = async (user) =>
  axios.post(`/auth/register`, user);

export const loginRequest = async (user) => {
  try {
    const response = await axios.post(`/auth/login`, user);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error;
  }
};


export const verifyTokenRequest = async () => axios.get(`/auth/verify`);
