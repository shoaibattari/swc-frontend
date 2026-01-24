const adminApi = (api) => ({
  addCampus: (campusData) => api.post("/campus/add", campusData),
  getCampuses: () => api.get("/campus/all-campus"),
  addCourse: (courseData) => api.post("/course/add", courseData),
  getCourses: () => api.get("/course/all-course"),
  addEvent: (eventData) => api.post("/event/add", eventData),
  getEvents: () => api.get("/event/all-event"),
  getParticipants: ({ search = "", page = 1, limit = 10 } = {}) =>
    api.get("/participant/all-participant", {
      params: { search, page, limit },
    }),
  markParticipantPaid: (participantId, body) =>
    api.patch(`/participant/${participantId}/payment-status`, body),
  markParticipantAttendance: (participantId, body) =>
    api.patch(`/participant/${participantId}/attendance`, body),
  getStats: () => api.get("/participant/stats"),

  getStudents: ({ search = "", page = 1, limit = 10 } = {}) =>
    api.get("/student/all-student", {
      params: { search, page, limit },
    }),
  getStudentStats: () => api.get("/student/stats"),

    markStudentPaid: (studentId, body) =>
    api.patch(`/student/${studentId}/payment-status`, body),
  markStudentAttendance: (studentId, body) =>
    api.patch(`/student/${studentId}/attendance`, body),
});

export default adminApi;
