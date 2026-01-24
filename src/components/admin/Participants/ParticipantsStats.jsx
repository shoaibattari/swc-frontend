import React, { useEffect } from "react";
import { useAppContext } from "../../../context/AppContext";
import { StatsCard } from "../../common";

const ParticipantsStats = () => {
  const { stats, statsLoading, fetchStats } = useAppContext();
  useEffect(() => {
    fetchStats(); // fetch stats on mount
  }, []);

  return (
    <div className="grid  grid-cols-3 laptop-sm:grid-cols-3 gap-4">
      <StatsCard
        title="Total Participants"
        total={stats?.total}
        male={stats?.gender?.male}
        female={stats?.gender?.female}
        loading={statsLoading}
      />
      <StatsCard
        title="Paid Participants"
        total={stats?.paid?.total}
        male={stats?.paid?.male}
        female={stats?.paid?.female}
        loading={statsLoading}
      />
      <StatsCard
        title="Attendance"
        total={stats?.attendance?.total}
        male={stats?.attendance?.male}
        female={stats?.attendance?.female}
        loading={statsLoading}
      />
    </div>
  );
};

export default ParticipantsStats;
