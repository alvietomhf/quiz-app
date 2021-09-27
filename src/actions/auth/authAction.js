import instance from "../instance";
import {
  SET_USER,
  GET_ERRORS,
  // SAVE_ACCESS,
  REMOVE_ACCESS,
  LOGOUT,
} from "../../constants/types";
import { token } from "../../config/token";
import history from "../history";

export const registerUser = (data, role) => async (dispatch) => {
  await instance
    .post(`api/register/${role}`, data)
    .then((response) => {
      const res = response.data;
      console.log(res);
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.data,
      });
      // console.log(message);
    });
};

export const loginUser = (data) => async (dispatch) => {
  await instance.get("sanctum/csrf-cookie").then(() => {
    instance
      .post("api/login", data)
      .then((response) => {
        const res = response.data;
        dispatch({
          type: SET_USER,
          payload: res.data,
        });
        // dispatch({
        //   type: SAVE_ACCESS,
        //   payload: res.data.token,
        // });
        // history.push("home");
        console.log(res);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch({
        type: GET_ERRORS,
        payload: error.response.data.data,
      });
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  });
};

export const logOut = async (dispatch) => {
  await instance({
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
      history.push("login");
      console.log(response);
    })
    .catch((error) => {
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: error,
      // });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
      console.log(error);
    });
};
