import api from "./axios";

export const login = async (data) => {
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);

  const response = await api.post("/token", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
}

export const logout = async () => {
  const refreshToken = localStorage.getItem('refresh_token')

  await api.post('/logout', null, {
    params: {
      refresh_token: refreshToken,
    },
  })

  localStorage.clear()
}
