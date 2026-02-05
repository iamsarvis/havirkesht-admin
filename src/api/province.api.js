import api from "./axios";

/**
 * GET /province/
 */
export const getProvinces = async ({
  page = 1,
  size = 10,
  search = "",
}) => {
  const response = await api.get("/province/", {
    params: {
      page,
      size,
      search: search || null,
    },
  });

  return response.data;
};

/**
 * POST /province/
 */
export const createProvince = async (data) => {
  const response = await api.post("/province/", data);
  return response.data;
};

/**
 * DELETE /province/{province}
 */
export const deleteProvince = async (provinceName) => {
  const response = await api.delete(`/province/${provinceName}`);
  return response.data;
};
