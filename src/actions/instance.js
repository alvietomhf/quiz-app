import axios from "axios";

const instance = axios.create({
  baseURL: "http://quizapi.vieproject.xyz/",
  withCredentials: true,
});

export default instance;
