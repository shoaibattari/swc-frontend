import React from "react";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
  success: "bg-green/50 text-white hover:bg-green/60",
  danger: "bg-red/50 text-white hover:bg-red/60",
  warning: "bg-yellow/50 text-white hover:bg-yellow/60",
  light: "bg-gray/10 text-gray-800 hover:bg-gray/20",
  dark: "bg-gray/80 text-white hover:bg-gray/90",
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-7 py-3 text-lg",
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
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {leftIcon && <span className="mr-2">{FaArrowRight}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default CommonButton;
