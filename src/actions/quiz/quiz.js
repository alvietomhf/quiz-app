import instance from "../instance";
import { token } from "../../config/token";

const index = (roles) =>
  instance({
    url: "/api/" + roles + "/quizzes",
    method: "get",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const detail = (roles, slug) =>
  instance({
    url: "/api/" + roles + "/quizzes/" + slug,
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
