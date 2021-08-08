import instance from "../instance";
import {
  SET_USER,
  GET_ERRORS,
  SAVE_ACCESS,
  REMOVE_ACCESS,
  LOGOUT,
} from "../../constants/types";
import { token } from "../../config/token";

export const loginUser = (data) => (dispatch) => {
  instance.get("sanctum/csrf-cookie").then(() => {
    instance
      .post("api/login", data)
      .then((response) => {
        const res = response.data;
        // const token = res.data.token;
        // Cookies.set("access", token);
        dispatch({
          type: SET_USER,
          payload: res.data,
        });
        dispatch({
          type: SAVE_ACCESS,
          payload: res.data.token,
        });
        console.log(res);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch({
            type: GET_ERRORS,
            payload: error.response.data.message,
          });
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  });
};

export const logOut = (dispatch) => {
  // const token = Cookies.get("access");
  instance({
    url: "/api/logout",
    method: "post",
    headers: {
      Authorization: "Bearer " + token(),
    },
  })
    .then((response) => {
      dispatch({
        type: LOGOUT,
        payload: {},
      });
      dispatch({
        type: REMOVE_ACCESS,
        payload: {},
      });
      // Cookies.remove("access");
      console.log("Logout success");
      console.log(response);
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      console.log(error);
    });
};
