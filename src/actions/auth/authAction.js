import instance from "../instance";
import { SET_USER, GET_ERRORS, SAVE_ACCESS, REMOVE_ACCESS, LOGOUT } from "../../constants/types";
import Cookies from "js-cookie";
import store from "../../store";

export function getToken() {
  const state = store.getState();
  return state.access.accessToken;
}

// const state = store.getState();
// const token = state.access.accessToken;

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
          payload: res.data.token
        });
        console.log(res);
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.message,
        });
      });
  });
};

export const logOut = (dispatch) => {
  // const token = Cookies.get("access");
  instance({
    url: "/api/logout",
    method: "post",
    headers: {
      Authorization: "Bearer " + getToken(),
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
        payload: error.message,
      });
      console.log(error);
    });
};

// instance
//   .post("api/logout")
//   .then(
//     () => {
//       Cookies.remove('access')
//       dispatch({
//         type: LOGOUT,
//         payload: {},
//       });
//       console.log("Logout success");
//     },
//     (error) => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: error.message,
//       });
//       console.log(error.message);
//     }
//   )
//   .catch((error) => {
//     dispatch({
//       type: GET_ERRORS,
//       payload: error.message,
//     });
//     console.log(error.message);
//   });
