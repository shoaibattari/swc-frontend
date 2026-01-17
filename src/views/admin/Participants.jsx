import { DynamicViewTitle } from "../../components";
import ParticipantsTable from "../../components/admin/Participants/ParticipantsTable";
import ParticipantsStats from "../../components/admin/Participants/ParticipantsStats";

const Participants = () => {
  return (
    <div className="w-full space-y-6">
      <DynamicViewTitle
        title="Participants Management"
        description="View All Details According Events Participants"
      />

      <ParticipantsStats />

      {/* Participants Table */}
      <ParticipantsTable />
    </div>
  );
};

export default Participants;
