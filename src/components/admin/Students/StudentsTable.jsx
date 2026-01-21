import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAppContext } from "../../../context/AppContext";
import { useAuthContext } from "../../../context/AuthContext";

import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";
import apis from "../../../config/api";

const StudentsTable = () => {
  const { role } = useAuthContext();
  const isAdmin = role === "admin";

  const {
    students,
    fetchAllStudents,
    fetchingStudents,
    pagination,
    fetchStats,
  } = useAppContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // -----------------------------
  // Debounced Search
  // -----------------------------
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setCurrentPage(1);
      fetchAllStudents({
        search: searchTerm,
        page: 1,
        limit: pageSize,
      });
    }, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm, pageSize]);

  // -----------------------------
  // Pagination
  // -----------------------------
  useEffect(() => {
    fetchAllStudents({
      search: searchTerm,
      page: currentPage,
      limit: pageSize,
    });
  }, [currentPage, pageSize]);

  // -----------------------------
  // Helpers
  // -----------------------------
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-500 text-green-50";
      case "Un-paid":
        return "bg-red-500 text-red-50";
      default:
        return "bg-gray-200 text-gray-400";
    }
  };

  // -----------------------------
  // Attendance Mutation
  // -----------------------------
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
        fetchStats();
      },

      onError: (error) =>
        toast.error(error?.message || "Failed to update attendance"),
    }
  );

  // -----------------------------
  // Paid Mutation
  // -----------------------------
  const { mutate: markPaid, isPending: markingPaid } = useMutation({
    mutationFn: ({ studentId, isPaid }) =>
      apis.markStudentPaid(studentId, { isPaid }),

    onSuccess: () => {
      fetchAllStudents({
        search: searchTerm,
        page: currentPage,
        limit: pageSize,
      });
      fetchStats();
    },

    onError: (error) =>
      toast.error(error?.message || "Failed to mark student as paid"),
  });

  // -----------------------------
  // Columns
  // -----------------------------
  const userColumns = [
    { label: "ID", accessor: "studentId" },
    { label: "Full Name", accessor: "fullName" },
    { label: "Father / Husband Name", accessor: "fatherName" },
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
              markAttendance({
                studentId: row.id,
                isAttend: !row.isAttend,
              })
            }
            disabled={!canToggle || updatingAttendance}
            className={`px-2 py-1 text-sm rounded text-white
              ${row.isAttend ? "bg-green-500" : "bg-red-500 hover:opacity-70"}`}
          >
            {row.isAttend ? "Present" : "Absent"}
          </button>
        );
      },
    },
  ];

  const adminExtraColumns = [
    { label: "Contact", accessor: "contact" },
    {
      label: "Email",
      accessor: "email",
      renderCell: (row) => (
        <span className="max-w-[140px] block truncate" title={row.email}>
          {row.email || "--"}
        </span>
      ),
    },
    { label: "Community", accessor: "community" },
    { label: "Cast", accessor: "cast" },
    { label: "CNIC", accessor: "cnic" },
    {
      label: "Payment Slip",
      accessor: "paymentSlip",
      renderCell: (row) => {
        if (!row.paymentSlip?.url) {
          return <span className="text-gray-400">No Slip</span>;
        }

        return (
          <button
            onClick={() => window.open(row.paymentSlip.url, "_blank")}
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:opacity-70"
          >
            View Slip
          </button>
        );
      },
    },
    {
      label: "Status",
      accessor: "status",
      renderCell: (row) => (
        <button
          onClick={() =>
            markPaid({
              studentId: row.id,
              isPaid: row.status !== "Paid",
            })
          }
          disabled={markingPaid || !row.paymentSlip?.url}
          className={`px-2 py-1 text-sm rounded hover:opacity-70 ${getStatusColor(
            row.status
          )}`}
        >
          {row.status === "Paid"
            ? "Paid"
            : markingPaid
            ? "Updating..."
            : "Mark as Paid"}
        </button>
      ),
    },
  ];

  const columns = isAdmin
    ? [...userColumns, ...adminExtraColumns]
    : userColumns;

  // -----------------------------
  // Normalize Data
  // -----------------------------
  const tableData = students?.map((s) => ({
    id: s._id,
    studentId: s.studentId || "--",
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
    <WhiteContainer>
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
      />
    </WhiteContainer>
  );
};

export default StudentsTable;
