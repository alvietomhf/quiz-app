import instance from "../instance";
import { token } from "../../config/token";

const index = () =>
  instance({
    url: "/api/quizzes?type=quiz",
    method: "get",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const detail = (slug) =>
  instance({
    url: "/api/quizzes/" + slug,
    method: "get",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });
const apiQuiz = {
  index,
  detail
};

export default apiQuiz;
