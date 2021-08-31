import store from "../store";

export function token() {
  const state = store.getState();
  return state.auth.data.token;
}
