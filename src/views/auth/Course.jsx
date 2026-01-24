import React from "react";
import { useAppContext } from "../../context/AppContext";
import { ComingSoon, CourseForm, NoAdmission } from "../../components";

const Course = () => {
  const { courses, fetchingCourses } = useAppContext();

  // 🧠 Logic: Priority goes to Open Admissions, then Coming Soon
  const admissionOpen =
    courses?.filter((c) => c.status === "Admission Open") || [];
  const comingSoon = courses?.filter((c) => c.status === "Coming Soon") || [];

  /**
   * ELITE LOADING STATE
   * Mimics the container structure to prevent "layout jump"
   */
  if (fetchingCourses) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 tablet:p-12 space-y-10 animate-pulse font-outfit">
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 rounded-full w-32" />
          <div className="h-12 bg-slate-200 rounded-2xl w-2/3" />
        </div>
        <div className="h-[60vh] bg-white border border-lightGray rounded-[2.5rem] w-full shadow-sm" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-outfit">
      {/* Smooth Entrance Wrapper
         This handles the transition between different component states 
      */}
      <div className="animate-in fade-in slide-in-from-top-2 duration-700">
        {admissionOpen.length > 0 ? (
          /* STATE 1: Admissions are Live */
          <CourseForm />
        ) : comingSoon.length > 0 ? (
          /* STATE 2: Future Admissions Teaser */
          <div className="py-16 px-4 tablet:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <span className="text-secondary font-black uppercase tracking-[0.2em] text-[10px] bg-secondary/10 px-4 py-2 rounded-full">
                Skill Development
              </span>
              <h2 className="text-4xl laptop:text-5xl font-black text-grey mt-6">
                New Batches Arriving
              </h2>
              <p className="text-mediumGray font-medium mt-4 text-lg max-w-2xl mx-auto">
                We are currently preparing our next curriculum. Explore the
                upcoming courses below and stay tuned for admission openings.
              </p>
            </div>

            <ComingSoon items={comingSoon} type="course" />
          </div>
        ) : (
          /* STATE 3: Empty State */
          <div className="flex flex-col items-center justify-center min-h-[75vh] px-4">
            <NoAdmission
              type="course"
              title="Admissions Paused"
              message="All our current course batches are full. Please check back later for our next semester intake."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
