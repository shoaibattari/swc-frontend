import React, { useEffect } from "react";
import { useAppContext } from "../../../context/AppContext";
import { StatsCard } from "../../common";

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
