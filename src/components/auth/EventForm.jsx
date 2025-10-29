import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInput, Wrapper, CommonButton } from "../index";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import apis from "../../config/api";
import { useState } from "react";

const EventForm = () => {
  const { events } = useAppContext(); // ✅ now using events instead of courses/campuses
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ✅ Initial values
  const initialValues = {
    event: "",
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

  // ✅ Validation
  const validationSchema = Yup.object({
    event: Yup.string().required("Event is required"),
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

  // ✅ Submit Handler
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await apis.registerParticipant(values);
      if (data?.status) {
        toast.success("Registration successful!");
        resetForm();
        setSelectedEvent(null);
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Error submitting form");
    }
  };

  return (
    <Wrapper className="py-12">
      <div className="mx-auto rounded-lg p-8">
        <h2 className="text-5xl font-bold text-center mb-6 text-primary">
          Event Registration
        </h2>

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
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* --- EVENT --- */}
                <CustomInput
                  label="Select Event"
                  type="select"
                  name="event"
                  value={values.event}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setFieldValue("event", selectedId);
                    const ev = events.find((ev) => ev._id === selectedId);
                    setSelectedEvent(ev || null);
                  }}
                  onBlur={handleBlur}
                  options={events.map((e) => ({
                    value: e._id,
                    label: e.title || e.name, // ✅ support either field
                  }))}
                  error={touched.event && errors.event}
                />

                {/* --- PERSONAL INFO --- */}
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
                  label="Contact"
                  name="contact"
                  value={values.contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contact && errors.contact}
                />

                <CustomInput
                  label="Email"
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
                  label="Community Card Number"
                  name="communityCardNumber"
                  value={values.communityCardNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.communityCardNumber && errors.communityCardNumber
                  }
                />

                <CustomInput
                  label="CNIC"
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

                <CustomInput
                  label="Qualification"
                  name="qualification"
                  value={values.qualification}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.qualification && errors.qualification}
                />

                <CustomInput
                  label="Institute"
                  name="institute"
                  value={values.institute}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.institute && errors.institute}
                />

                <CustomInput
                  label="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address && errors.address}
                />

                <CustomInput
                  label="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && errors.city}
                />
              </div>

              <div className="flex justify-end mt-8">
                <CommonButton type="submit" variant="primary">
                  Submit Registration
                </CommonButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Wrapper>
  );
};

export default EventForm;
