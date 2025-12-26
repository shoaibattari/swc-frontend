import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "../../../context/AppContext";
import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";
import apis from "../../../config/api";
import { toast } from "react-toastify";

const ParticipantsTable = () => {
  const {
    participants,
    fetchAllParticipants,
    fetchingParticipants,
  } = useAppContext();

  const getStatusColor = (status) => {
    switch (status) {
      case "Un-paid":
        return "bg-red-500 text-red-50";
      case "Paid":
        return "bg-green-500 text-green-50";

      default:
        return "bg-gray-200 text-gray-400";
    }
  };

  const { mutate: markAttendance, isPending: updatingAttendance } = useMutation(
    {
      mutationFn: ({ participantId, isAttend }) =>
        apis.markParticipantAttendance(participantId, { isAttend }),
      onSuccess: () => {
        toast.success("Attendance updated successfully!");
        fetchAllParticipants?.(); // refresh participants after update
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to update attendance");
      },
    }
  );

  const { mutate: markPaid, isPending: markingPaid } = useMutation({
    mutationFn: ({ participantId, isPaid }) =>
      apis.markParticipantPaid(participantId, { isPaid }),
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
          <button
            onClick={() =>
              markPaid({ participantId: row.id, isPaid: row.status !== "Paid" })
            }
            disabled={markingPaid}
            className={`px-2 py-1 text-nowrap text-sm rounded ${getStatusColor(
              row.status
            )} transition `}
          >
            {row.status === "Paid"
              ? "Paid"
              : markingPaid
              ? "Updating..."
              : "Mark as Paid"}
          </button>
        </div>
      ),
    },
    {
      label: "Attendance",
      accessor: "isAttend",
      renderCell: (row) => (
        <button
          onClick={() =>
            markAttendance({ participantId: row.id, isAttend: !row.isAttend })
          }
          disabled={updatingAttendance}
          className={`px-2 py-1 text-sm rounded ${
            row.isAttend ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {row.isAttend ? "Present" : "Absent"}
        </button>
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
      isAttend: p.isAttend || false,
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
