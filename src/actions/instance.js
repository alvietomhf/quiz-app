import axios from "axios";
import Cookies from "js-cookie";
import { logOut } from "./auth/authAction";

let token = Cookies.get("access");

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      logOut()
      Cookies.remove("access");
      setTimeout(() => {
        window.location.reload()
      }, 500);
      return Promise.reject();
    }

    return Promise.reject(error);
  }
);

export default instance;
