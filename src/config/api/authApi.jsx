const authApi = (api) => ({
  loginUser: (payload) => api.post("/auth/login", payload),
  registerUser: (payload) => api.post("/auth/register", payload),
  getProfile: () => api.get("/auth/profile"), //
});

export default authApi;