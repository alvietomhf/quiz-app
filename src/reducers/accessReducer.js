import { REMOVE_ACCESS, SAVE_ACCESS } from "../constants/types";

const initialState = {
    accessToken:{}
};

export default function accessReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_ACCESS:
      return {
        ...state,
        accessToken: action.payload,
      };
    case REMOVE_ACCESS:
      return {
        ...state,
        accessToken: {},
      };
    default:
      return state;
  }
}
