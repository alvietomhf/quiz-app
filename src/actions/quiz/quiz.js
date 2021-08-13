import instance from "../instance";
import { token } from "../../config/token";

const index = (type) =>
  instance({
    url: `/api/quizzes?type=${type}`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const apiQuiz = {
  index,
};

export default apiQuiz;
