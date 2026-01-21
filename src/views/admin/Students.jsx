import { DynamicViewTitle } from "../../components";
import StudentsStats from "../../components/admin/Students/StudentsStats";
import StudentsTable from "../../components/admin/Students/StudentsTable";

const Students = () => {
  return (
    <div className="w-full space-y-6">
      <DynamicViewTitle
        title="Students Management"
        description="View All Details According Events Students"
      />

      <StudentsStats />

      {/* Students Table */}
      <StudentsTable />
    </div>
  );
};

export default Students;
