import { ADD_SCORE_QUIZ, DELETE_SCORE_QUIZ } from "../constants/types";

const initialState = {
    score: 0,
};
export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SCORE_QUIZ:
      return {
          ...state,
          score: action.payload,
      };
    case DELETE_SCORE_QUIZ:
      return {
          ...state,
          score: 0,
      };
    default:
      return state;
  }
}

