import instance from "../instance";
import { SET_USER, GET_ERRORS, LOGOUT } from "../../constants/types";
import Cookies from "js-cookie";

export const loginUser = (data) => (dispatch) => {
  instance.get("sanctum/csrf-cookie").then(() => {
    instance
      .post("api/login", data)
      .then((response) => {
        const res = response.data;
        const token = res.data.token;
        Cookies.set("access", token);
        dispatch({
          type: SET_USER,
          payload: res.data.user,
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
  const token = Cookies.get("access");
  instance({
    url: "/api/logout",
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      dispatch({
        type: LOGOUT,
        payload: {},
      });
      Cookies.remove("access")
      console.log("Logout success");
      console.log(response);
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.message,
      });
      console.log(error.message);
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
