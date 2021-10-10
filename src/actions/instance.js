import axios from "axios";

const instance = axios.create({
  baseURL: "https://quizapi.vieproject.xyz/",
  withCredentials: true,
});

export default instance;
