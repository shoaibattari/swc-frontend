import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "../../../context/AppContext";
import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";
import apis from "../../../config/api";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../context/AuthContext";
import {
  MdCheckCircle,
  MdEvent,
  MdPayment,
  MdInfoOutline,
  MdAccountCircle,
} from "react-icons/md";

const ParticipantsTable = () => {
  const { role } = useAuthContext();
  const isAdmin = role === "admin";
  const {
    participants,
    fetchAllParticipants,
    fetchingParticipants,
    pagination,
    fetchStats,
  } = useAppContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Better for dashboard

  // Debounce & Pagination Logic
  const debounceTimeout = useRef(null);
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setCurrentPage(1);
      fetchAllParticipants({ search: searchTerm, page: 1, limit: pageSize });
    }, 500);
    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm, pageSize]);

  useEffect(() => {
    fetchAllParticipants({
      search: searchTerm,
      page: currentPage,
      limit: pageSize,
    });
  }, [currentPage, pageSize]);

  // Mutations
  const { mutate: markAttendance, isPending: updatingAttendance } = useMutation(
    {
      mutationFn: ({ participantId, isAttend }) =>
        apis.markParticipantAttendance(participantId, { isAttend }),
      onSuccess: () => {
        fetchAllParticipants({
          search: searchTerm,
          page: currentPage,
          limit: pageSize,
        });
        fetchStats();
      },
      onError: (error) => toast.error(error?.message || "Attendance failed"),
    }
  );

  const { mutate: markPaid, isPending: markingPaid } = useMutation({
    mutationFn: ({ participantId, isPaid }) =>
      apis.markParticipantPaid(participantId, { isPaid }),
    onSuccess: () => {
      fetchAllParticipants({
        search: searchTerm,
        page: currentPage,
        limit: pageSize,
      });
      fetchStats();
    },
    onError: (error) => toast.error(error?.message || "Payment update failed"),
  });

  // --- Premium Columns Design ---
  const userColumns = [
    {
      label: "ID",
      accessor: "participantId",
      renderCell: (row) => (
        <span className="font-mono text-primary font-bold">
          {row.participantId}
        </span>
      ),
    },
    {
      label: "Participant",
      accessor: "fullName",
      renderCell: (row) => (
        <div className="flex items-center gap-3">
          <div className="hidden desktop:block w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-mediumGray">
            <MdAccountCircle size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-grey capitalize leading-tight">
              {row.fullName}
            </span>
            <span className="text-[10px] text-mediumGray">
              S/O: {row.fatherName}
            </span>
          </div>
        </div>
      ),
    },
    { label: "Gender", accessor: "gender" },
    {
      label: "Attendance",
      accessor: "isAttend",
      renderCell: (row) => {
        const canToggle = isAdmin || !row.isAttend;
        return (
          <button
            onClick={() =>
              canToggle &&
              markAttendance({ participantId: row.id, isAttend: !row.isAttend })
            }
            disabled={!canToggle || updatingAttendance}
            className={`flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-full text-[11px] font-bold transition-all
              ${
                row.isAttend
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
              }`}
          >
            {row.isAttend ? (
              <MdCheckCircle size={14} />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            )}
            {row.isAttend ? "Present" : "Absent"}
          </button>
        );
      },
    },
  ];

  const adminExtraColumns = [
    {
      label: "Event Info",
      accessor: "eventName",
      renderCell: (row) => (
        <div className="flex flex-col max-w-[150px]">
          <span
            className="font-bold text-xs text-grey truncate"
            title={row.eventName}
          >
            {row.eventName}
          </span>
          <span className="text-[10px] text-primary font-medium">
            {row.category}
          </span>
        </div>
      ),
    },
    {
      label: "Contact & CNIC",
      accessor: "cnic",
      renderCell: (row) => (
        <div className="flex flex-col gap-0.5 text-[11px]">
          <span className="font-semibold text-grey">{row.contact}</span>
          <span className="text-mediumGray">{row.cnic}</span>
        </div>
      ),
    },
    {
      label: "Background",
      accessor: "community",
      renderCell: (row) => (
        <div className="text-[11px]">
          <span className="text-grey font-semibold">{row.community}</span>
          <span className="text-mediumGray block text-[10px]">{row.cast}</span>
        </div>
      ),
    },
    {
      label: "Fee Status",
      accessor: "status",
      renderCell: (row) => (
        <button
          onClick={() =>
            markPaid({ participantId: row.id, isPaid: row.status !== "Paid" })
          }
          disabled={markingPaid}
          className={`flex items-center cursor-pointer justify-center gap-1 min-w-[100px] px-3 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-tighter transition-all
            ${
              row.status === "Paid"
                ? "bg-secondary/10 text-secondary"
                : "bg-orange-50 text-orange-600 border border-orange-100"
            }`}
        >
          {row.status === "Paid" ? (
            <MdPayment size={14} />
          ) : (
            <MdInfoOutline size={14} />
          )}
          {row.status === "Paid" ? "Paid" : "Un-paid"}
        </button>
      ),
    },
  ];

  const columns = isAdmin
    ? [...userColumns, ...adminExtraColumns]
    : userColumns;

  const data = participants?.map((p) => ({
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
  }));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
      <WhiteContainer className="!p-0 overflow-hidden rounded-[2.5rem] border border-light-grey shadow-sm">
        <DynamicTable
          hideSearchBar={false}
          hidePageSize={true}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          columns={columns}
          data={data}
          loading={fetchingParticipants}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={pagination?.totalPages || 1}
          pageSize={pageSize}
          setPageSize={setPageSize}
          placeholder="Search participant name, ID or CNIC..."
        />
      </WhiteContainer>
    </div>
  );
};

export default ParticipantsTable;
