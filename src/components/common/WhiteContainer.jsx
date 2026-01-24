import React from "react";

const WhiteContainer = ({
  children,
  heightFit,
  className = "",
  isNotShadowed = false,
  height = "", // Custom height if needed
  noPadding = false,
}) => {
  return (
    <div
      className={`
        w-full bg-white 
        /* Rounded corners to match the Elite UI set (2.5rem) */
        rounded-[2rem] laptop:rounded-[2.5rem] 
        
        /* Modern Shadow + Border combo */
        ${
          isNotShadowed
            ? "border border-lightGray"
            : "border border-lightGray shadow-custom"
        }
        
        /* Controlled Padding */
        ${noPadding ? "p-0" : "p-6 tablet:p-8 laptop:p-10"}
        
        /* Layout Logic - Prevents "jumping" or screen overflow */
        ${heightFit ? "h-fit" : height || "min-h-[70vh]"}
        
        /* Smooth Entrance Animation */
        animate-in fade-in slide-in-from-bottom-4 duration-700
        
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default WhiteContainer;
