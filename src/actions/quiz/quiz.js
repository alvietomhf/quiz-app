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

const postQuiz = (postData) =>
  instance({
    url: `/api/guru/quizzes`,
    data: postData,
    method: "post",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const deleteQuiz = (slug) =>
  instance({
    url: `/api/guru/quizzes/${slug}`,
    method: "delete",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const apiQuiz = {
  index,
  deleteQuiz,
  postQuiz
};

export default apiQuiz;
