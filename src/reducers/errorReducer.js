import { GET_ERRORS, RESET_ERRORS } from "../constants/types";

const initialState = {
  message: {},
  isError: false,
};
export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        message: action.payload,
        isError: true,
      };
    case RESET_ERRORS:
      return {
        ...state,
        message: {},
        isError: false,
      };
    default:
      return state;
  }
}
