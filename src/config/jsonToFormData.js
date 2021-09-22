import { buildFormData } from "../components/BuildFormData";

export const jsonToFormData = (data) => {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};
