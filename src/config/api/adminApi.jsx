const adminApi = (api) => ({
  addCampus: (campusData) => api.post("/campus/add", campusData),
  getCampuses: () => api.get("/campus/all-campus"),
});

export default adminApi;
