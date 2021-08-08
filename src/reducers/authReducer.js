import { LOGOUT,SET_USER } from "../constants/types";

const initialState = {
  data: {},
  isAuthenticated: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        data: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        data: {},
        isAuthenticated: false
      };
    default:
      return state;
  }
}
