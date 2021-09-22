import instance from "../instance";
import { token } from "../../config/token";

const index = () =>
  instance({
    url: `/api/materi`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });
const detail = (id) =>
  instance({
    url: `/api/materi/${id}`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const postMaterials = (postData) =>
  instance({
    url: `/api/guru/materi`,
    data: postData,
    method: "post",
    headers: {
      Authorization: "Bearer " + token(),
      "Content-Type": "multipart/form-data",
    },
  });

const updateMaterials = (putData, slug) =>
  instance({
    url: `/api/guru/materi/${slug}`,
    data: putData,
    method: "post",
    headers: {
      Authorization: "Bearer " + token(),
      "Content-Type": "multipart/form-data",
    },
  });

const deleteMaterials = (id) =>
  instance({
    url: `/api/guru/materi/${id}`,
    method: "delete",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const deleteImageMaterials = (id) =>
  instance({
    url: `/api/guru/materi/${id}/image`,
    method: "delete",
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

const apiMaterials = {
  index,
  detail,
  deleteMaterials,
  postMaterials,
  updateMaterials,
  deleteImageMaterials,
};

export default apiMaterials;
