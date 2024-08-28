import axios from "axios";
import { API_URL } from "../config";

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default instance;

fetch('https://cerrajeria-api.vercel.app/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

