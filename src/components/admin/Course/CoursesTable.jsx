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
    { label: "Section", accessor: "section" },
    { label: "Campus", accessor: "campusName" },
    { label: "Fees", accessor: "fees" },
    { label: "Categories", accessor: "category" },
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
          section: course?.section || "--",
          fees: course?.fees || "--",
          batch: course?.batch || "--",
          campusName:
            course?.courseCampus?.name || course?.courseCampusName || "--",
          category: course?.category || "--",
          status: course?.status || "--",
        }))}
        loading={fetchingCourses}
      />
    </WhiteContainer>
  );
};

export default CoursesTable;
