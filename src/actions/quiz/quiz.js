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
      "Content-Type": "multipart/form-data",
    },
  });

const postResultQuiz = (postData, slug) =>
  instance({
    url: `/api/siswa/result/${slug}/quiz`,
    data: { data: postData },
    method: "post",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const updateQuiz = (putData, slug) =>
  instance({
    url: `/api/guru/quizzes/${slug}`,
    data: putData,
    method: "post",
    headers: {
      Authorization: "Bearer " + token(),
      "Content-Type": "multipart/form-data",
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

const resultQuiz = (slug) =>
  instance({
    url: `/api/guru/result/${slug}/quiz`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const apiQuiz = {
  index,
  deleteQuiz,
  postQuiz,
  updateQuiz,
  postResultQuiz,
  resultQuiz,
};

export default apiQuiz;
