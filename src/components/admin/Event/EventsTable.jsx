import { useAppContext } from "../../../context/AppContext";
import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";

const EventsTable = () => {
  const { events, campuses, fetchingEvents } = useAppContext();
  console.log(events, "events");
  // ✅ Table columns
  const columns = [
    { label: "Event Name", accessor: "name" },
    { label: "Event Description", accessor: "description" },
    { label: "Date", accessor: "date" },
    { label: "Duration", accessor: "duration" },
    { label: "Venue", accessor: "venue" },
    { label: "Gender", accessor: "gender" },
    { label: "Category", accessor: "category" },
    { label: "Status", accessor: "status" },
    { label: "Fees", accessor: "fees" },
  ];

  const data = events?.map((event) => {
    const campus = campuses.find((c) => c._id === event?.eventCampus);
    console.log(campus, "campus");

    return {
      id: event?._id,
      name: event?.name || "--",
      date: event?.date || "--",
      description: event?.description || "--",
      duration: event?.duration || "--",
      venue: event?.venue || "--",
      gender: event?.gender || "--",
      category: Array.isArray(event?.category)
        ? event.category.join(", ")
        : event?.category || "--",
      status: event?.status || "--",
      fees:
        event?.fees === 0 ? "Free" : event?.fees ? `Rs. ${event?.fees}` : "--",
    };
  });
  return (
    <WhiteContainer>
      <DynamicTable
        hideSearchBar={false}
        columns={columns}
        data={data}
        loading={fetchingEvents}
      />
    </WhiteContainer>
  );
};

export default EventsTable;
