import axios from "axios";
import { API_URL } from "../config";

const instance = axios.create({
  withCredentials: true,
  baseURL: "*",
});

export default instance;
