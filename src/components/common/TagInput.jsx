import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlineLabel } from "react-icons/md";

const TagInput = ({
  label,
  name,
  values,
  setFieldValue,
  touched,
  errors,
  className = "",
}) => {
  const [tagInput, setTagInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = tagInput.trim();
      // Only add if value exists and isn't already in the list
      if (value && !values[name]?.includes(value)) {
        setFieldValue(name, [...(values[name] || []), value]);
      }
      setTagInput("");
    }
  };

  const removeTag = (idx) => {
    const updated = values[name].filter((_, i) => i !== idx);
    setFieldValue(name, updated);
  };

  const hasError = touched?.[name] && errors?.[name];

  return (
    <div className={`w-full mb-5 font-outfit ${className}`}>
      {label && (
        <label className="block mb-1.5 text-[11px] font-black uppercase tracking-widest text-mediumGray">
          {label}
        </label>
      )}

      <div
        className={`flex flex-wrap gap-2 items-center px-3 py-2.5 min-h-[50px] bg-white border rounded-xl transition-all duration-300 focus-within:ring-4 focus-within:border-primary ${
          hasError
            ? "border-red-500 focus-within:ring-red-50"
            : "border-lightGray focus-within:ring-primary/5 focus-within:border-primary"
        }`}
      >
        {/* Render existing tags as Pills */}
        {values[name]?.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full animate-in zoom-in-95 duration-200"
          >
            <span className="text-xs font-bold leading-none">{item}</span>
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="text-primary/60 hover:text-primary transition-colors"
              aria-label={`Remove ${item}`}
            >
              <IoCloseCircle size={16} />
            </button>
          </div>
        ))}

        {/* Dynamic Input */}
        <div className="flex-1 flex items-center gap-2 min-w-[150px]">
          {values[name]?.length === 0 && (
            <MdOutlineLabel className="text-mediumGray/40" size={18} />
          )}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              values[name]?.length > 0
                ? "Add more..."
                : `Enter ${label.toLowerCase()}...`
            }
            className="w-full bg-transparent outline-none text-sm font-medium text-grey placeholder:text-mediumGray/50"
          />
        </div>
      </div>

      {/* Error Message */}
      {hasError && (
        <p className="text-[11px] font-bold text-red-500 mt-1.5 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-500 rounded-full" /> {errors[name]}
        </p>
      )}
    </div>
  );
};

export default TagInput;
