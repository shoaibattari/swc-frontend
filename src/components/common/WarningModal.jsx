import React from "react";
import { IoAlertCircle } from "react-icons/io5";
import CommonButton from "./CommonButton"; // Reusing the elite button we made

const WarningModal = ({
  onConfirm,
  onCancel,
  loading,
  heading = "record",
  title = "Confirm Deletion",
  message,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden font-outfit">
      {/* Icon Section with Soft Glow */}
      <div className="flex flex-col items-center pt-4">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4 animate-bounce-subtle">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
            <IoAlertCircle className="text-red-600 text-4xl" />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-xl font-black text-grey mb-2">{title}</h2>

        <p className="text-sm text-mediumGray font-medium px-4 mb-8 leading-relaxed">
          {message || (
            <>
              Are you sure you want to delete this{" "}
              <span className="text-red-600 font-bold">{heading}</span>? This
              action cannot be undone.
            </>
          )}
        </p>

        {/* Elite Action Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full px-2">
          <CommonButton
            variant="light"
            onClick={onCancel}
            disabled={loading}
            className="border-none bg-slate-100 hover:bg-slate-200"
          >
            Cancel
          </CommonButton>

          <CommonButton
            variant="danger"
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Deleting</span>
              </div>
            ) : (
              "Delete"
            )}
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

// Simple animation for the icon
const style = document.createElement("style");
style.textContent = `
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  .animate-bounce-subtle {
    animation: bounce-subtle 2s ease-in-out infinite;
  }
`;
document.head.append(style);

export default WarningModal;
