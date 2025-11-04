import { useAppContext } from "../../../context/AppContext";
import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";

const ParticipantsTable = () => {
  const { participants, fetchingParticipants } = useAppContext();

  console.log("🚀 ~ ParticipantsTable ~ participants:", participants);

  // ✅ Table columns (based on participant data)
  const columns = [
    { label: "ID", accessor: "participantId" },
    { label: "Event Name", accessor: "eventName" },
    { label: "Category", accessor: "category" },
    { label: "Full Name", accessor: "fullName" },
    { label: "Father Name", accessor: "fatherName" },
    { label: "Gender", accessor: "gender" },
    { label: "Address", accessor: "address" },
    { label: "Contact", accessor: "contact" },
    { label: "Email", accessor: "email" },
    { label: "Community", accessor: "community" },
    { label: "Cast", accessor: "cast" },
    { label: "CNIC", accessor: "cnic" },
    { label: "Event Date", accessor: "eventDate" },
    { label: "Venue", accessor: "venue" },
    { label: "Status", accessor: "status" },
  ];

  // ✅ Transform participant data into table-ready format
  const data = participants?.map((p) => {
    return {
      id: p._id,
      participantId: p.participantId || "--",
      fullName: p.fullName || "--",
      fatherName: p.fatherName || "--",
      gender: p.gender || "--",
      address: p.address || "--",
      contact: p.contact || "--",
      email: p.email || "--",
      community: p.community || "--",
      cast: p.cast || "--",
      cnic: p.cnic || "--",
      category: p.category || "--",
      eventName: p.event?.name || "--",
      eventDate: p.event?.date
        ? new Date(p.event.date).toLocaleDateString()
        : "--",
      venue: p.event?.venue || "--",
      status: p.isPaid ? "Paid" : "Un-paid",
    };
  });

  return (
    <WhiteContainer>
      <DynamicTable
        hideSearchBar={false}
        columns={columns}
        data={data}
        loading={fetchingParticipants}
      />
    </WhiteContainer>
  );
};

export default ParticipantsTable;
