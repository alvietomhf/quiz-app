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
        dispatch({
          type: SET_USER,
          payload: res.data.user,
        });
        dispatch({
          type: SAVE_ACCESS,
          payload: res.data.token,
        });
        console.clear()
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
      console.clear()
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
