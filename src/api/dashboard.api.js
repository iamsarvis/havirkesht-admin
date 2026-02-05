import api from "./axios";

export const getFullReport = async (cropYearId) => {
  const response = await api.post("/report-full/", {
    crop_year_id: cropYearId,
  });

  return response.data;
};
