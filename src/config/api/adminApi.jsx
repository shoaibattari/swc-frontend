const adminApi = (api) => ({
  addCampus: (campusData) => api.post("/campus/add", campusData),
  getCampuses: () => api.get("/campus/all-campus"),
  addCourse: (courseData) => api.post("/course/add", courseData),
  getCourses: () => api.get("/course/all-course"),
});

export default adminApi;
