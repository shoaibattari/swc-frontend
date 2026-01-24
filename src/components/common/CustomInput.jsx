import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdExpandMore, MdErrorOutline } from "react-icons/md";

const CustomInput = ({
  label,
  type = "text",
  placeholder = "",
  readOnly = false,
  options = [],
  field, // Formik field
  form, // Formik form
  name,
  value,
  onChange,
  onBlur,
  error,
  maxLength,
  rows = 4,
  className = "",
  showPasswordToggle = false,
}) => {
  const inputName = name || field?.name;
  const inputValue = value ?? field?.value ?? "";
  const handleChange = onChange || field?.onChange;
  const handleBlur = onBlur || field?.onBlur;

  const metaError =
    error || (form?.touched?.[inputName] && form?.errors?.[inputName]) || null;

  const [inputType, setInputType] = useState(type);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selectedOption = options?.find((opt) => opt.value === inputValue);

  const handleSelect = (option) => {
    if (form?.setFieldValue) {
      form.setFieldValue(inputName, option.value);
    } else if (handleChange) {
      handleChange({ target: { name: inputName, value: option.value } });
    }
    setOpenDropdown(false);
  };

  const togglePassword = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  // Elite Styling Classes
  const baseInputClass = `w-full px-4 py-2.5 text-sm rounded-xl border transition-all duration-200 outline-none font-medium`;
  const stateClasses = metaError
    ? "border-red-500 bg-red-50/10 focus:ring-2 focus:ring-red-200"
    : "border-lightGray bg-white focus:border-primary focus:ring-4 focus:ring-primary/5";
  const readonlyClasses =
    "bg-slate-50 border-lightGray text-mediumGray cursor-not-allowed";

  return (
    <div className={`mb-5 w-full font-outfit ${className}`} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={inputName}
          className="block mb-1.5 text-[11px] font-black uppercase tracking-widest text-mediumGray"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {type === "select" ? (
          <>
            <div
              id={inputName}
              onClick={() => !readOnly && setOpenDropdown(!openDropdown)}
              className={`${baseInputClass} ${stateClasses} ${
                readOnly ? readonlyClasses : "cursor-pointer"
              } flex items-center justify-between gap-3`}
            >
              <span
                className={selectedOption ? "text-grey" : "text-mediumGray/60"}
              >
                {selectedOption
                  ? selectedOption.label
                  : placeholder || "Select option"}
              </span>
              <MdExpandMore
                size={22}
                className={`text-mediumGray transition-transform duration-300 ${
                  openDropdown ? "rotate-180" : ""
                }`}
              />
            </div>

            {openDropdown && (
              <ul className="absolute left-0 mt-2 w-full bg-white border border-lightGray shadow-xl rounded-2xl p-2 z-[100] max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                {options.map((opt, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelect(opt)}
                    className={`cursor-pointer py-2.5 px-4 rounded-xl text-sm transition-colors ${
                      inputValue === opt.value
                        ? "bg-primary text-white font-bold"
                        : "text-grey hover:bg-lightGray/40"
                    }`}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : type === "textarea" ? (
          <textarea
            id={inputName}
            {...field}
            name={inputName}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            readOnly={readOnly}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            className={`${baseInputClass} ${stateClasses} ${
              readOnly ? readonlyClasses : ""
            } resize-none`}
          />
        ) : (
          <div className="relative group">
            <input
              id={inputName}
              type={showPasswordToggle ? inputType : type}
              {...field}
              name={inputName}
              value={inputValue}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={readOnly}
              placeholder={placeholder}
              className={`${baseInputClass} ${stateClasses} ${
                readOnly ? readonlyClasses : ""
              }`}
            />

            {showPasswordToggle && (
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mediumGray hover:text-primary p-2 transition-colors"
              >
                {inputType === "password" ? (
                  <FaEye size={18} />
                ) : (
                  <FaEyeSlash size={18} />
                )}
              </button>
            )}

            {type === "tel" && (
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mediumGray font-bold text-xs pointer-events-none">
                +1
              </span>
            )}
            {type === "tel" && (
              <style>{`#${inputName} { padding-left: 2.5rem; }`}</style>
            )}
          </div>
        )}
      </div>

      {metaError && (
        <div className="flex items-center gap-1.5 mt-1.5 text-red-500 animate-in fade-in slide-in-from-top-1">
          <MdErrorOutline size={14} />
          <p className="text-[11px] font-bold tracking-tight">{metaError}</p>
        </div>
      )}
    </div>
  );
};

export default CustomInput;
