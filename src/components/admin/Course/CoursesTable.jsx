import { useAppContext } from "../../../context/AppContext";
import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";

const CoursesTable = () => {
  const { courses, fetchingCourses } = useAppContext();

  // ✅ Table columns
  const columns = [
    { label: "Course Name", accessor: "name" },
    { label: "Duration", accessor: "duration" },
    { label: "Gender", accessor: "gender" },
    { label: "Batch", accessor: "batch" },
    { label: "Campus", accessor: "campusName" },
    { label: "Status", accessor: "status" },
  ];

  return (
    <WhiteContainer>
      <DynamicTable
        hideSearchBar={false}
        columns={columns}
        data={courses?.map((course) => ({
          id: course?._id,
          name: course?.name || "--",
          duration: course?.duration || "--",
          gender: course?.gender || "--",
          batch: course?.batch || "--",
          campusName:
            course?.courseCampus?.name || course?.courseCampusName || "--",
          status: course?.status || "--",
        }))}
        loading={fetchingCourses}
      />
    </WhiteContainer>
  );
};

export default CoursesTable;
