import React, { useEffect } from "react";
import { useAppContext } from "../../../context/AppContext";

const StatsCard = ({ title, total, male, female, loading }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-1 laptop-sm:p-3 w-full ">
      <h3 className="text-gray-700 min-h-9 font-semibold text-xs laptop-sm:text-lg ">
        {title}
      </h3>

      {loading ? (
        <div className="space-y-2">
          <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-5 w-20 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-5 w-20 bg-gray-300 rounded animate-pulse"></div>
        </div>
      ) : (
        <div>
          <p className="text-lg text-center laptop-sm:text-start laptop-sm:text-2xl font-bold text-green-900">
            {total || 0}
          </p>
          <div className="flex justify-between items-center gap-1">
            <p className="text-xs laptop-sm:text-base text-gray-600">Male: </p>
            <p className="font-bold text-sm laptop-sm:text-xl"> {male || 0} </p>
          </div>
          <div className="flex justify-between items-center gap-1">
            <p className="text-xs laptop-sm:text-base text-gray-600">
              Female:{" "}
            </p>
            <p className="font-bold text-sm laptop-sm:text-xl">
              {" "}
              {female || 0}{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const StudentsStats = () => {
  const { stuStats, statsStuLoading, fetchStudentStats } = useAppContext();

  useEffect(() => {
    fetchStudentStats(); // fetch student stats on mount
  }, []);

  return (
    <div className="grid grid-cols-3 laptop-sm:grid-cols-3 gap-4">
      <StatsCard
        title="Total Students"
        total={stuStats?.total}
        male={stuStats?.gender?.male}
        female={stuStats?.gender?.female}
        loading={statsStuLoading}
      />
      <StatsCard
        title="Paid Students"
        total={stuStats?.paid?.total}
        male={stuStats?.paid?.male}
        female={stuStats?.paid?.female}
        loading={statsStuLoading}
      />
      <StatsCard
        title="Attendance"
        total={stuStats?.attendance?.total}
        male={stuStats?.attendance?.male}
        female={stuStats?.attendance?.female}
        loading={statsStuLoading}
      />
    </div>
  );
};

export default StudentsStats;
