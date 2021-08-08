import axios from "axios";
import { token } from "../config/token";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token()}`,
  },
});

export default instance;
