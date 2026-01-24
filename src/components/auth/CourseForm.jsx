import React, { useMemo, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInput, Wrapper, CommonButton } from "../index";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import apis from "../../config/api";

const CourseForm = () => {
  const { courses } = useAppContext();
  const [sections, setSections] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // ✅ Memoized Campus logic
  const campuses = useMemo(() => {
    const openCourses =
      courses?.filter((course) => course?.status === "Admission Open") || [];
    const uniqueCampuses = [];
    const campusMap = new Map();

    openCourses.forEach((course) => {
      const campus = course.courseCampus;
      if (campus && !campusMap.has(campus._id)) {
        campusMap.set(campus._id, campus);
        uniqueCampuses.push(campus);
      }
    });

    return uniqueCampuses;
  }, [courses]);

  const initialValues = {
    campus: "",
    course: "",
    sectionTime: "",
    fullName: "",
    fatherName: "",
    contact: "",
    email: "",
    community: "",
    cast: "",
    communityCardNumber: "",
    cnic: "",
    gender: "",
    dob: "",
    qualification: "",
    institute: "",
    address: "",
    city: "",
  };

  const validationSchema = Yup.object({
    campus: Yup.string().required("Campus is required"),
    course: Yup.string().required("Course is required"),
    sectionTime: Yup.string().required("Section time is required"),
    fullName: Yup.string().required("Full name is required"),
    fatherName: Yup.string().required("Father name is required"),
    contact: Yup.string().required("Contact is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    community: Yup.string().required("Community is required"),
    cast: Yup.string().required("Cast is required"),
    communityCardNumber: Yup.string().required(
      "Community card number is required"
    ),
    cnic: Yup.string().required("CNIC is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.string().required("Date of birth is required"),
    qualification: Yup.string().required("Qualification is required"),
    institute: Yup.string().required("Institute is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await apis.registerParticipant(values);
      if (data?.status) {
        toast.success("Course registration successful!");
        resetForm();
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Error submitting form");
    }
  };

  return (
    <Wrapper className="py-8 laptop-sm:py-16 bg-[#F8FAFC] min-h-screen font-outfit">
      <div className="max-w-5xl mx-auto">
        {/* Elite Header */}
        <div className="text-center mb-12 animate-in fade-in duration-700">
          <h2 className="text-3xl laptop-sm:text-5xl font-black text-grey">
            Course Admission
          </h2>
          <p className="mt-4 text-mediumGray font-medium text-lg">
            Enroll in our professional programs to advance your career.
          </p>
        </div>

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
            setFieldValue,
          }) => (
            <Form className="space-y-8">
              {/* SECTION 1: COURSE SELECTION */}
              <div className="bg-white p-6 laptop-sm:p-10 rounded-[2.5rem] shadow-sm border border-lightGray">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center font-bold">
                    01
                  </span>
                  <h3 className="text-xl font-black text-grey uppercase tracking-tight">
                    Program Selection
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <CustomInput
                    label="Select Campus"
                    type="select"
                    name="campus"
                    value={values.campus}
                    onChange={(e) => {
                      const campusId = e.target.value;
                      setFieldValue("campus", campusId);
                      setFieldValue("course", "");
                      setFieldValue("sectionTime", "");
                      setSections([]);
                      const filtered = courses?.filter(
                        (c) =>
                          c.courseCampus?._id === campusId &&
                          c.status === "Admission Open"
                      );
                      setFilteredCourses(filtered || []);
                    }}
                    onBlur={handleBlur}
                    options={campuses.map((c) => ({
                      value: c._id,
                      label: c.name,
                    }))}
                    error={touched.campus && errors.campus}
                  />

                  <CustomInput
                    label="Select Course"
                    type="select"
                    name="course"
                    disabled={!values.campus}
                    value={values.course}
                    onChange={(e) => {
                      const courseId = e.target.value;
                      setFieldValue("course", courseId);
                      setFieldValue("sectionTime", "");
                      const selectedCourse = filteredCourses.find(
                        (c) => c._id === courseId
                      );
                      setSections(selectedCourse?.section || []);
                    }}
                    onBlur={handleBlur}
                    options={filteredCourses.map((c) => ({
                      value: c._id,
                      label: c.name,
                    }))}
                    error={touched.course && errors.course}
                  />

                  <CustomInput
                    label="Select Section"
                    type="select"
                    name="sectionTime"
                    disabled={!values.course}
                    value={values.sectionTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={sections.map((s) => ({ value: s, label: s }))}
                    error={touched.sectionTime && errors.sectionTime}
                  />
                </div>
              </div>

              {/* SECTION 2: PERSONAL INFO */}
              <div className="bg-white p-6 laptop-sm:p-10 rounded-[2.5rem] shadow-sm border border-lightGray">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center font-bold">
                    02
                  </span>
                  <h3 className="text-xl font-black text-grey uppercase tracking-tight">
                    Student Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 laptop-sm:grid-cols-3 gap-x-8 gap-y-2">
                  <CustomInput
                    label="Full Name"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fullName && errors.fullName}
                  />
                  <CustomInput
                    label="Father Name"
                    name="fatherName"
                    value={values.fatherName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fatherName && errors.fatherName}
                  />
                  <CustomInput
                    label="Contact No"
                    name="contact"
                    value={values.contact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.contact && errors.contact}
                  />
                  <CustomInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                  />
                  <CustomInput
                    label="Community"
                    name="community"
                    value={values.community}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.community && errors.community}
                  />
                  <CustomInput
                    label="Cast"
                    name="cast"
                    value={values.cast}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.cast && errors.cast}
                  />
                  <CustomInput
                    label="Community Card #"
                    name="communityCardNumber"
                    value={values.communityCardNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.communityCardNumber && errors.communityCardNumber
                    }
                  />
                  <CustomInput
                    label="CNIC Number"
                    name="cnic"
                    value={values.cnic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.cnic && errors.cnic}
                  />
                  <CustomInput
                    label="Gender"
                    type="select"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={[
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                    ]}
                    error={touched.gender && errors.gender}
                  />
                  <CustomInput
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.dob && errors.dob}
                  />
                </div>
              </div>

              {/* SECTION 3: ACADEMICS & ADDRESS */}
              <div className="bg-white p-6 laptop-sm:p-10 rounded-[2.5rem] shadow-sm border border-lightGray">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center font-bold">
                    03
                  </span>
                  <h3 className="text-xl font-black text-grey uppercase tracking-tight">
                    Academics & Location
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-10">
                  <CustomInput
                    label="Last Qualification"
                    name="qualification"
                    value={values.qualification}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.qualification && errors.qualification}
                  />
                  <CustomInput
                    label="Institute Name"
                    name="institute"
                    value={values.institute}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.institute && errors.institute}
                  />
                  <div className="md:col-span-2">
                    <CustomInput
                      label="Residential Address"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.address && errors.address}
                    />
                  </div>
                  <CustomInput
                    label="City"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && errors.city}
                  />
                </div>

                <div className="flex justify-center pt-8 border-t border-lightGray">
                  <CommonButton
                    type="submit"
                    variant="primary"
                    className="w-full md:w-auto px-20 py-4 text-lg"
                  >
                    Complete Admission
                  </CommonButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Wrapper>
  );
};

export default CourseForm;
