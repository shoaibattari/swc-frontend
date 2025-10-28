import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import apis from "../../../config/api";
import { toast } from "react-toastify";
import { useAppContext } from "../../../context/AppContext";
import { CommonButton, CustomInput } from "../../common";

const AddCourseForm = ({ closeModal }) => {
  const { campuses, fetchAllCourses } = useAppContext();

  // ✅ Mutation for adding new course
  const { mutate: addCourse, isPending: addingCourse } = useMutation({
    mutationFn: (formData) => apis.addCourse(formData),
    onSuccess: () => {
      closeModal();
      fetchAllCourses();
      toast.success("Course added successfully!");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to add course");
    },
  });

  // ✅ Initial Form Values
  const initialValues = {
    name: "",
    duration: "",
    gender: "",
    batch: "",
    status: "",
    courseCampus: "",
    category: [], // new
  };

  // ✅ Validation Schema (fixed status values)
  const validationSchema = Yup.object({
    name: Yup.string().required("Course name is required"),
    duration: Yup.string().required("Duration is required"),
    gender: Yup.string().oneOf(["Male", "Female", "Both"], "Select a gender"),
    status: Yup.string().oneOf(
      ["Coming Soon", "Admission Open", "Admission Closed"],
      "Select a status"
    ),
    batch: Yup.string().required("Batch is required"),
    courseCampus: Yup.string().required("Campus is required"),
    category: Yup.array().of(Yup.string().trim()),
  });

  // ✅ Submit Handler
  const handleSubmit = (values) => {
    // ensure category is array (Formik already keeps it as array)
    addCourse(values);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          setFieldValue, // <-- important
        }) => {
          // local state for the category input text
          const [tagInput, setTagInput] = useState("");

          const addTag = (raw) => {
            const val = (raw || tagInput || "").trim();
            if (!val) return;
            // allow comma-separated multiple in the input (e.g. "a, b")
            const parts = val
              .split(",")
              .map((p) => p.trim())
              .filter(Boolean);

            const newTags = [...values.category];
            parts.forEach((p) => {
              if (!newTags.includes(p)) newTags.push(p);
            });

            setFieldValue("category", newTags);
            setTagInput("");
          };

          const onKeyDown = (e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag();
            }
          };

          const removeTag = (index) => {
            const updated = values.category.filter((_, i) => i !== index);
            setFieldValue("category", updated);
          };

          return (
            <Form className="space-y-5">
              {/* Name */}
              <CustomInput
                label="Course Name"
                name="name"
                type="text"
                placeholder="Enter course name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
              />

              {/* Duration */}
              <CustomInput
                label="Duration"
                name="duration"
                type="text"
                placeholder="e.g. 6 Months / 1 Year"
                value={values.duration}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.duration && errors.duration}
              />

              {/* Gender */}
              <CustomInput
                type="select"
                label="Gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.gender && errors.gender}
                options={[
                  { value: "", label: "Select gender" },
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Both", label: "Both" },
                ]}
              />

              {/* Batch */}
              <CustomInput
                label="Batch"
                name="batch"
                type="text"
                placeholder="Enter batch name or year"
                value={values.batch}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.batch && errors.batch}
              />

              {/* Campus */}
              <CustomInput
                type="select"
                label="Campus"
                name="courseCampus"
                value={values.courseCampus}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.courseCampus && errors.courseCampus}
                options={[
                  { value: "", label: "Select campus" },
                  ...campuses.map((campus) => ({
                    value: campus._id,
                    label: campus.name,
                  })),
                ]}
              />

              {/* Status */}
              <CustomInput
                type="select"
                label="Status"
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.status && errors.status}
                options={[
                  { value: "", label: "Select Status" },
                  { value: "Coming Soon", label: "Coming Soon" },
                  { value: "Admission Open", label: "Admission Open" },
                  { value: "Admission Closed", label: "Admission Closed" },
                ]}
              />

              {/* Category: Tag input */}
              <div>
                <label className="block font-medium mb-2">
                  Category (optional)
                </label>
                <div className="flex gap-2 items-center">
                  <div className="flex-1 border rounded p-2 flex flex-wrap gap-2 items-center">
                    {values.category.length > 0 &&
                      values.category.map((cat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-gray-200 rounded px-2 py-1 text-sm"
                        >
                          <span>{cat}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(idx)}
                            className="text-xs leading-none"
                            aria-label={`Remove ${cat}`}
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      placeholder="Type category and press Enter or click +"
                      className="flex-1 min-w-40 outline-none p-1 text-sm"
                    />
                  </div>
                </div>
                {touched.category && errors.category ? (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.category}
                  </div>
                ) : null}
              </div>

              <CommonButton
                disabled={addingCourse}
                type="submit"
                variant="primary"
                size="md"
                fullWidth
              >
                {addingCourse ? "Adding..." : "Add Course"}
              </CommonButton>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddCourseForm;
