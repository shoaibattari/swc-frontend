import React from "react";
import { useLocation } from "react-router-dom";

const DynamicViewTitle = ({ title, children, description, className = "" }) => {
  const location = useLocation();

  return (
    <div
      className={`w-full flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-6 pt-8 border-b border-lightGray/50 ${className}`}
    >
      {/* Title and Description Section */}
      <div className="flex flex-col gap-1">
        {/* Breadcrumb style hint (Optional but Elite) */}
        {location.pathname !== "/" && (
          <span className="text-[10px] uppercase font-black text-primary tracking-[0.2em] mb-1">
            Dashboard {location.pathname.replace("/", " / ")}
          </span>
        )}

        <h1 className="font-black text-2xl desktop:text-3xl text-grey tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="text-sm text-mediumGray font-medium max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Actions Section (Children) */}
      {children && (
        <div className="flex items-center gap-3 shrink-0">{children}</div>
      )}
    </div>
  );
};

export default DynamicViewTitle;
