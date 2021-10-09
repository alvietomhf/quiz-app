import axios from "axios";

const instance = axios.create({
  baseURL: "http://quizapi.vieproject.xyz:8000/",
  withCredentials: true,
});

export default instance;
