import React from "react";
import { DynamicViewTitle } from "../common";
import StudentsStats from "../admin/Students/StudentsStats";
import StudentsTable from "../admin/Students/StudentsTable";

const Students = () => {
  return (
    <div className="w-full">
      <DynamicViewTitle
        title={"Students Management"}
        description={"View All Details According Students "}
      />

      <StudentsStats />
      <StudentsTable />
    </div>
  );
};

export default Students;
