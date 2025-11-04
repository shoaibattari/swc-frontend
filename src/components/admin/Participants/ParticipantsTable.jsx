import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "../../../context/AppContext";
import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";

const ParticipantsTable = () => {
  const { participants, fetchAllParticipants, fetchingParticipants } =
    useAppContext();

  console.log("🚀 ~ ParticipantsTable ~ participants:", participants);
  const getStatusColor = (status) => {
    console.log("🚀 ~ getStatusColor ~ status:", status);
    switch (status) {
      case "Un-paid":
        return "bg-red-500 text-red-50";
      case "Paid":
        return "bg-green-500 text-green-50";

      default:
        return "bg-gray-200 text-gray-400";
    }
  };

  const { mutate: markPaid, isPending: markingPaid } = useMutation({
    mutationFn: (participantId) => apis.markParticipantPaid(participantId),
    onSuccess: () => {
      toast.success("Participant marked as Paid!");
      fetchAllParticipants?.(); // refresh participants after update
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to mark participant as Paid");
    },
  });
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
    {
      label: "Status",
      accessor: "status",
      renderCell: (row) => (
        <div className="flex flex-col items-start gap-2">
          <span
            className={`px-2 py-1 rounded text-nowrap ${getStatusColor(
              row.status
            )}`}
          >
            {row.status}
          </span>

          {row.status === "Un-paid" && (
            <button
              onClick={() => markPaid(row.id)}
              disabled={markingPaid}
              className="px-2 py-1 text-nowrap text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {markingPaid ? "Updating..." : "Mark as Paid"}
            </button>
          )}
        </div>
      ),
    },
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
