import { useAppContext } from "../../../context/AppContext";
import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";

const EventsTable = () => {
  const { events, fetchingEvents } = useAppContext();

  // ✅ Table columns
  const columns = [
    { label: "Event Name", accessor: "name" },
    { label: "Date", accessor: "date" },
    { label: "Duration", accessor: "duration" },
    { label: "Venue", accessor: "venue" },
    { label: "Gender", accessor: "gender" },
    { label: "Category", accessor: "category" },
    { label: "Status", accessor: "status" },
    { label: "Fees", accessor: "fees" },
    { label: "Campus", accessor: "campusName" },
  ];

  return (
    <WhiteContainer>
      <DynamicTable
        hideSearchBar={false}
        columns={columns}
        data={events?.map((event) => ({
          id: event?._id,
          name: event?.name || "--",
          date: event?.date || "--",
          duration: event?.duration || "--",
          venue: event?.venue || "--",
          gender: event?.gender || "--",
          category: Array.isArray(event?.category)
            ? event.category.join(", ")
            : event?.category || "--",
          status: event?.status || "--",
          fees:
            event?.fees === 0
              ? "Free"
              : event?.fees
              ? `Rs. ${event?.fees}`
              : "--",
          campusName:
            event?.eventCampus?.name || event?.eventCampusName || "--",
        }))}
        loading={fetchingEvents}
      />
    </WhiteContainer>
  );
};

export default EventsTable;
