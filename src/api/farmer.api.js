import api from "./axios";

export const getAllFarmers = async (params = {}) => {
  const response = await api.get("/farmer/", {
    params: {
      page: params.page ?? 1,
      size: params.size ?? 50,
      sort_by: params.sort_by ?? null,
      sort_order: params.sort_order ?? null,
      search: params.search ?? null,
    },
  });

  return response.data;
};

export const createFarmer = async (data) => {
  const response = await api.post("/farmer/", data);
  return response.data;
};

export const getFarmerByNationalId = async (nationalId) => {
  const response = await api.get(`/farmer/${nationalId}`);
  return response.data;
};

export const updateFarmer = async (nationalId, data) => {
  const response = await api.put(`/farmer/${nationalId}`, data);
  return response.data;
};

export const deleteFarmer = async (nationalId) => {
  const response = await api.delete(`/farmer/${nationalId}`);
  return response.data;
};