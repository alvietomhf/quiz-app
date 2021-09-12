import { token } from "../config/token";
import instance from "./instance";

const index = (id) =>
  instance({
    url: `/api/users/${id}`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const apiUser = {
  index,
};

export default apiUser;
