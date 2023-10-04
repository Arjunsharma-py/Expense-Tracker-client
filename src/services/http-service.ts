import apiClient from "./api-client";

export const mngData = () => {
  apiClient
    .get("mng")
    .then((res) => {
      return res.data.results;
    })
    .catch();
};
