import { token } from "../../config/token";
import instance from "../instance";

const indexFeed = () =>
  instance({
    url: "api/feeds",
    method: "get",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

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
const postFeedComments = (data, feedID) =>
  instance({
    url: `/api/feeds/${feedID}/reply`,
    data: data,
    method: "post",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const apiFeeds = {
  postFeed,
  indexFeed,
  postFeedComments,
};

export default apiFeeds;
