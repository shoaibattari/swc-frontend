import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAppContext } from "../../../context/AppContext";
import { useAuthContext } from "../../../context/AuthContext";
import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";
import apis from "../../../config/api";
import {
  MdVerified,
  MdError,
  MdVisibility,
  MdCheckCircle,
} from "react-icons/md";

const StudentsTable = () => {
  const { role } = useAuthContext();
  const isAdmin = role === "admin";

  const {
    students,
    fetchAllStudents,
    fetchingStudents,
    pagination,
    fetchStudentStats,
  } = useAppContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default to 10 for better view

  // Debounce & Pagination Logic (Same as before)
  const debounceTimeout = useRef(null);
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setCurrentPage(1);
      fetchAllStudents({ search: searchTerm, page: 1, limit: pageSize });
    }, 500);
    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm, pageSize]);

  useEffect(() => {
    fetchAllStudents({
      search: searchTerm,
      page: currentPage,
      limit: pageSize,
    });
  }, [currentPage, pageSize]);

  // --- UI Mutations & Handlers ---
  const { mutate: markAttendance, isPending: updatingAttendance } = useMutation(
    {
      mutationFn: ({ studentId, isAttend }) =>
        apis.markStudentAttendance(studentId, { isAttend }),
      onSuccess: () => {
        fetchAllStudents({
          search: searchTerm,
          page: currentPage,
          limit: pageSize,
        });
        fetchStudentStats();
      },
      onError: (error) =>
        toast.error(error?.message || "Attendance update failed"),
    }
  );

  const { mutate: markPaid, isPending: markingPaid } = useMutation({
    mutationFn: ({ studentId, isPaid }) =>
      apis.markStudentPaid(studentId, { isPaid }),
    onSuccess: () => {
      fetchAllStudents({
        search: searchTerm,
        page: currentPage,
        limit: pageSize,
      });
      fetchStudentStats();
    },
    onError: (error) => toast.error(error?.message || "Payment update failed"),
  });

  // --- Enhanced Columns UI ---
  const userColumns = [
    {
      label: "ID",
      accessor: "studentId",
      renderCell: (row) => (
        <span className="font-mono text-primary font-bold">
          {row.studentId}
        </span>
      ),
    },
    {
      label: "Student Name",
      accessor: "fullName",
      renderCell: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-grey capitalize">{row.fullName}</span>
          <span className="text-[10px] text-mediumGray">
            S/O: {row.fatherName}
          </span>
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
          <div className="flex justify-center items-center">
            <button
              onClick={() =>
                canToggle &&
                markAttendance({ studentId: row.id, isAttend: !row.isAttend })
              }
              disabled={!canToggle || updatingAttendance}
              className={`flex items-center cursor-pointer gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all
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
              {row.isAttend ? "Present" : "Mark Present"}
            </button>
          </div>
        );
      },
    },
  ];

  const adminExtraColumns = [
    { label: "Contact", accessor: "contact" },
    {
      label: "Identity",
      accessor: "cnic",
      renderCell: (row) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-grey">{row.cnic}</span>
          <span className="text-[10px] text-mediumGray truncate max-w-[120px]">
            {row.email}
          </span>
        </div>
      ),
    },
    {
      label: "Community",
      accessor: "community",
      renderCell: (row) => (
        <div className="text-[11px]">
          <span className="text-primary font-bold">{row.community}</span>
          <span className="text-mediumGray"> ({row.cast})</span>
        </div>
      ),
    },
    {
      label: "Fee Slip",
      accessor: "paymentSlip",
      renderCell: (row) =>
        row.paymentSlip?.url ? (
          <button
            onClick={() => window.open(row.paymentSlip.url, "_blank")}
            className="flex items-center cursor-pointer gap-1 text-primary hover:underline font-bold text-xs"
          >
            <MdVisibility size={16} /> View Slip
          </button>
        ) : (
          <span className="text-mediumGray/40 italic text-xs">No Slip</span>
        ),
    },
    {
      label: "Fee Status",
      accessor: "status",
      renderCell: (row) => (
        <button
          onClick={() =>
            markPaid({ studentId: row.id, isPaid: row.status !== "Paid" })
          }
          disabled={markingPaid || !row.paymentSlip?.url}
          className={`flex items-center cursor-pointer hover:opacity-80 justify-center gap-1 min-w-[100px] px-3 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-tighter transition-all
            ${
              row.status === "Paid"
                ? "bg-secondary/10 text-secondary"
                : "bg-orange-50 text-orange-600 border border-orange-100"
            }`}
        >
          {row.status === "Paid" ? (
            <MdVerified size={14} />
          ) : (
            <MdError size={14} />
          )}
          {row.status === "Paid" ? "Verified" : "Pending"}
        </button>
      ),
    },
  ];

  const columns = isAdmin
    ? [...userColumns, ...adminExtraColumns]
    : userColumns;

  const tableData = students?.map((s) => ({
    id: s._id,
    studentId: s.studentId || "N/A",
    fullName: s.fullName || "--",
    fatherName: s.fatherName || "--",
    gender: s.gender || "--",
    contact: s.contact || "--",
    email: s.email || "--",
    community: s.community || "--",
    cast: s.cast || "--",
    cnic: s.cnic || "--",
    isAttend: s.isAttend || false,
    status: s.isPaid ? "Paid" : "Un-paid",
    paymentSlip: s.paymentSlip || null,
  }));

  return (
    <div className="animate-in fade-in duration-500">
      <WhiteContainer className="!p-0 overflow-hidden rounded-[2rem] border border-light-grey">
        <DynamicTable
          hideSearchBar={false}
          hidePageSize={true}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          columns={columns}
          data={tableData}
          loading={fetchingStudents}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={pagination?.totalPages || 1}
          pageSize={pageSize}
          setPageSize={setPageSize}
          placeholder="Search by name, ID or CNIC..."
        />
      </WhiteContainer>
    </div>
  );
};

export default StudentsTable;
