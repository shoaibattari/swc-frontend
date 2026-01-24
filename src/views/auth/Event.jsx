import React from "react";
import { useAppContext } from "../../context/AppContext";
import {
  ComingSoon,
  EventForm,
  NoAdmission,
  TableSkeleton,
} from "../../components";

const Event = () => {
  const { events, fetchingEvents } = useAppContext();

  // 🧠 Filter events by status
  const registrationOpen =
    events?.filter((e) => e.status === "Registration Open") || [];
  const comingSoon = events?.filter((e) => e.status === "Coming Soon") || [];

  /**
   * ELITE LOADING STATE
   * Prevents layout shift by showing a skeleton while the context is fetching.
   */
  if (fetchingEvents) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 space-y-8 animate-pulse">
        <div className="h-20 bg-slate-200 rounded-[2rem] w-3/4 mb-10" />
        <div className="h-[40vh] bg-slate-100 rounded-[2.5rem] w-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Animation Wrapper: 
        Ensures that whatever component loads, it fades in smoothly.
      */}
      <div className="animate-in fade-in duration-700">
        {registrationOpen.length > 0 ? (
          /* Priority 1: Registration is active */
          <EventForm />
        ) : comingSoon.length > 0 ? (
          /* Priority 2: Nothing open, but something is coming */
          <div className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <span className="text-primary font-black uppercase tracking-widest text-xs bg-primary/10 px-4 py-2 rounded-full">
                Upcoming Opportunities
              </span>
              <h2 className="text-4xl font-black text-grey mt-6">Get Ready!</h2>
              <p className="text-mediumGray font-medium mt-2">
                Registration for these events will be opening very soon.
              </p>
            </div>
            <ComingSoon items={comingSoon} type="event" />
          </div>
        ) : (
          /* Priority 3: Dead state (Nothing active or coming) */
          <div className="flex items-center justify-center min-h-[80vh] px-4">
            <NoAdmission
              type="event"
              title="No Active Events"
              message="There are currently no events open for registration. Check back later!"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
