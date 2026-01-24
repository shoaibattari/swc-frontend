import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const variants = {
  // Use opacity for hover instead of full color shifts for a more "premium" feel
  primary: "bg-primary text-white hover:shadow-lg hover:shadow-primary/20",
  secondary: "bg-green text-white hover:bg-green/90 shadow-sm",
  success: "bg-[#E7F7EF] text-[#0D9555] hover:bg-[#D4F0E2]", // Modern soft success
  danger:
    "bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white",
  warning: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
  light:
    "bg-white border border-lightGray text-grey hover:bg-lightGray/10 shadow-sm",
  outline:
    "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
};

const sizes = {
  sm: "px-3 py-1.5 text-[11px] font-black uppercase tracking-wider",
  md: "px-6 py-2.5 text-sm font-bold",
  lg: "px-8 py-4 text-base font-black",
};

const CommonButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  className = "",
  type = "button",
  disabled = false,
}) => {
  // whitespace-nowrap is key to preventing layout overflow
  const baseStyles =
    "relative inline-flex items-center justify-center transition-all duration-300 active:scale-95 whitespace-nowrap rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 select-none overflow-hidden";

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled
    ? "opacity-40 grayscale cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  // Dynamic icon selection logic
  const LeftIcon = leftIcon === true ? FaArrowLeft : leftIcon;
  const RightIcon = rightIcon === true ? FaArrowRight : rightIcon;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {/* Icon containers with exact sizing to prevent layout jitter */}
      {leftIcon && (
        <span className="mr-2 flex items-center justify-center">
          <LeftIcon size={size === "sm" ? 12 : 16} />
        </span>
      )}

      <span className="relative z-10">{children}</span>

      {rightIcon && (
        <span className="ml-2 flex items-center justify-center">
          <RightIcon size={size === "sm" ? 12 : 16} />
        </span>
      )}
    </button>
  );
};

export default CommonButton;
