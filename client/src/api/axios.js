import axios from "axios";
import { API_URL } from "../config";

const instance = axios.create({
  withCredentials: false,
  baseURL: API_URL,
});

export default instance;
