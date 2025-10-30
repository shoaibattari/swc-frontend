import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Course = () => {
  const { courses } = useAppContext();
  const navigate = useNavigate();

  // 🧠 Group courses by status
  const admissionOpen =
    courses?.filter((c) => c.status === "Admission Open") || [];
  const comingSoon = courses?.filter((c) => c.status === "Coming Soon") || [];
  const admissionClosed =
    courses?.filter((c) => c.status === "Admission Closed") || [];

  const CourseCard = ({ course }) => {
    const colorMap = {
      "Admission Open": "green",
      "Coming Soon": "yellow",
      "Admission Closed": "red",
    };
    const color = colorMap[course.status] || "gray";
    const isClickable = course.status === "Admission Open";

    return (
      <div
        onClick={() => isClickable && navigate(`/courses/${course._id}`)}
        className={`rounded-2xl border p-5 shadow-sm transition hover:shadow-md
          bg-${color}-50 border-${color}-300 
          ${
            isClickable
              ? "cursor-pointer hover:-translate-y-1"
              : "cursor-not-allowed opacity-70"
          }
        `}
      >
        <h3 className={`text-lg font-semibold text-${color}-700 mb-1`}>
          {course.name}
        </h3>
        <p className="text-sm text-gray-700">
          Duration: <span className="font-medium">{course.duration}</span>
        </p>
        <p className="text-sm text-gray-700">
          Batch: <span className="font-medium">{course.batch}</span>
        </p>
        <p className="text-sm text-gray-700">
          Campus:{" "}
          <span className="font-medium">{course.courseCampus?.name}</span>
        </p>
        <p className={`text-sm mt-2 font-medium text-${color}-600`}>
          {course.status}
        </p>

        {isClickable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/courses/${course._id}`);
            }}
            className="mt-3 w-full bg-green-600 text-white py-1.5 rounded-lg text-sm hover:bg-green-700"
          >
            Apply Now
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-10">
      {/* 🟢 ADMISSION OPEN */}
      {admissionOpen.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Admission Open Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {admissionOpen.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* 🟡 COMING SOON */}
      {comingSoon.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-700">
            Coming Soon Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {comingSoon.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* 🔴 ADMISSION CLOSED */}
      {admissionClosed.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-700">
            Admission Closed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {admissionClosed.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* ⚪ IF NOTHING */}
      {courses?.length === 0 && (
        <p className="text-gray-500 text-center">
          No courses available right now.
        </p>
      )}
    </div>
  );
};

export default Course;
