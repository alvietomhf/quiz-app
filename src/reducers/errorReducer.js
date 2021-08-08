import { GET_ERRORS } from "../constants/types";

const initialState = {
    message: {},
    isError: false
};
export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
          ...state,
          message: action.payload,
          isError: true
      };
    default:
      return state;
  }
}
