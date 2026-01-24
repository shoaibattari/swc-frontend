import React, { useState, useEffect } from "react";

// --- Custom Component for Count Animation ---
const AnimatedCount = ({ value, duration = 1000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
};

// --- Updated StatsCard ---
const StatsCard = ({ title, total, male, female, loading }) => {
  return (
    <div className="bg-white rounded-4xl p-3 laptop-sm:p-4 shadow-sm border border-lightGray hover:border-primary/40 transition-all duration-500 group overflow-hidden relative">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <h3 className="text-primary font-bold text-[11px] laptop-sm:text-[13px] uppercase tracking-[0.15em] min-h-8 leading-tight">
          {title}
        </h3>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="h-12 w-3/4 bg-slate-100 rounded-2xl animate-pulse" />
          <div className="space-y-3 pt-4">
            <div className="h-4 w-full bg-slate-50 rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-50 rounded animate-pulse" />
          </div>
        </div>
      ) : (
        <div className="relative z-10">
          {/* Main Animated Total */}
          <div className="mb-6">
            <h2 className="text-4xl laptop-sm:text-5xl font-black text-grey tracking-tighter">
              <AnimatedCount value={total || 0} />
            </h2>
            <div className="h-1 w-12 bg-primary mt-2 rounded-full group-hover:w-20 transition-all duration-500" />
          </div>

          {/* Gender Breakdown with Mini Bars */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="group/item">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-bold text-mediumGray/70 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Male
                </span>
                <span className="font-bold text-grey">
                  <AnimatedCount value={male || 0} />
                </span>
              </div>
              <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                  style={{ width: `${total > 0 ? (male / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="group/item">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-bold text-mediumGray/70 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />{" "}
                  Female
                </span>
                <span className="font-bold text-grey">
                  <AnimatedCount value={female || 0} />
                </span>
              </div>
              <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink-500 transition-all duration-1000 ease-out"
                  style={{
                    width: `${total > 0 ? (female / total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
