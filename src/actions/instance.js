import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.212.71.204:8000/",
  withCredentials: true,
});

export default instance;
