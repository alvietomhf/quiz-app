import { token } from "../../config/token";
import instance from "../instance";

const postFeed = (data) =>
  instance({
    url: `/api/feeds`,
    data: data,
    method: "post",
    headers: {
      Authorization: "Bearer " + token(),
      "Content-Type": "multipart/form-data",
    },
  });

const apiFeeds = {
  postFeed,
};

export default apiFeeds;
