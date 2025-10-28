const adminApi = (api) => ({
  addCampus: (campusData) => api.post("/campus/add", campusData),
  getCampuses: () => api.get("/campus/all-campus"),
  addCourse: (courseData) => api.post("/course/add", courseData),
  getCourses: () => api.get("/course/all-course"),
  addEvent: (eventData) => api.post("/event/add", eventData),
  getEvents: () => api.get("/event/all-event"),
});

export default adminApi;
