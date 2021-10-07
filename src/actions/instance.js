import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.100.20:8000/",
  withCredentials: true,
});

export default instance;
