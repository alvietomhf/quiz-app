import axios from "axios";

const instance = axios.create({
  baseURL: window.env.API_URL,
  withCredentials: true,
});

export default instance;
