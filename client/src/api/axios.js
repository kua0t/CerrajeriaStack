import axios from "axios";
import { API_URL } from "../config";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://cerrajeria-api.vercel.app",
});

export default instance;
