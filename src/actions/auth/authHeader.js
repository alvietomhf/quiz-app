// import Cookies from "js-cookie";
import store from "../../store";

const state = store.getState();

function select(state) {
  return state.access.accessToken, console.log(state.access.accessToken);
}

export const authHeader = () => {
  const token = select(state);

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
};
