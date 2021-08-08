import axios from "axios";
// import Cookies from "js-cookie";
import store from "../store";
import { logOut } from "./auth/authAction";

export function getToken() {
  const state = store.getState();
  return state.access.accessToken;
}

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = getToken() ? `Bearer ${getToken()}` : "";
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
      logOut();
      // Cookies.remove("access");
      // window.location.reload();
      return Promise.reject();
    }

    return Promise.reject(error);
  }
);

export default instance;
