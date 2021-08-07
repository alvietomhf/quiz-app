import Cookies from "js-cookie";

export const authHeader = () => {
  const token = Cookies.get("access");

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
};
