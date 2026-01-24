import React, { useState } from "react"; // Fix: added React and useState properly
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInput, Wrapper, CommonButton } from "../index";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import apis from "../../config/api";
import { useMutation } from "@tanstack/react-query";
import Modal from "../common/Modal";

const EventForm = () => {
  const { events, fetchAllParticipants } = useAppContext();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    event: "",
    category: "",
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
    city: "karachi",
  };

  const validationSchema = Yup.object({
    event: Yup.string().required("Event is required"),
    category: Yup.string().when("event", {
      is: (val) => {
        const ev = events.find((e) => e._id === val);
        return ev?.category?.length > 0;
      },
      then: (schema) => schema.required("Category is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    fullName: Yup.string().required("Full name is required"),
    fatherName: Yup.string().required("Father name is required"),
    contact: Yup.string().required("Contact is required"),
    email: Yup.string().email("Invalid email"),
    community: Yup.string().required("Community is required"),
    cnic: Yup.string().required("CNIC is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.string()
      .max(new Date(), "Future dates are not allowed")
      .required("Date of birth is required"),
    qualification: Yup.string().required("Qualification is required"),
    institute: Yup.string().required("Institute is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
  });

  const {
    mutate: registerParticipant,
    isLoading: registeringParticipant,
  } = useMutation({
    mutationFn: (formData) => apis.registerParticipant(formData),
    onSuccess: (data) => {
      setModalData(handleModalData(data?.data?.data));
      setIsModalOpen(true);
      toast.success("Registration successful!");
    },
    onError: (error) => {
      toast.error(error?.message || "Error submitting form");
    },
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        eventId: values.event,
        categoryId: values.category || null,
      };
      registerParticipant(payload);
      resetForm();
      setSelectedEvent(null);
    } catch (error) {
      toast.error("Submission failed");
    }
  };

  const handleModalData = (data) => {
    return {
      "Participant ID": data.participantId,
      "Full Name": data.fullName,
      "Event Name": data.event,
      Category: data.category || "N/A",
      Contact: data.contact,
      Email: data.email || "—",
      Gender: data.gender,
      "Date of Birth": data.dob,
    };
  };

  return (
    <Wrapper className="py-8 laptop-sm:py-16 bg-[#F8FAFC] min-h-screen font-outfit">
      <div className="max-w-5xl mx-auto">
        {/* Elite Header Update */}
        <div className="text-center mb-12 animate-in fade-in duration-700">
          <h2 className="text-3xl laptop-sm:text-5xl font-black text-grey">
            Event Registration
          </h2>
          <p className="mt-4 text-mediumGray font-medium text-lg">
            Fill in your details to participate in OMJ community events.
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
              {/* SECTION 1: EVENT SELECTION */}
              <div className="bg-white p-6 laptop-sm:p-10 rounded-[2.5rem] shadow-sm border border-lightGray">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold">
                    01
                  </span>
                  <h3 className="text-xl font-black text-grey uppercase tracking-tight">
                    Select Event
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <CustomInput
                    label="Choose Event *"
                    type="select"
                    name="event"
                    value={values.event}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      setFieldValue("event", selectedId);
                      const ev = events?.find((ev) => ev._id === selectedId);
                      setSelectedEvent(ev || null);
                      setFieldValue("category", "");
                    }}
                    onBlur={handleBlur}
                    options={events
                      ?.filter((e) => e.status === "Registration Open")
                      .map((e) => ({
                        value: e._id,
                        label: e.title || e.name,
                      }))}
                    error={touched.event && errors.event}
                    placeholder="Select an active event"
                  />

                  {selectedEvent?.category?.length > 0 && (
                    <CustomInput
                      label="Event Category *"
                      type="select"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={selectedEvent.category.map((cat) => ({
                        value: cat,
                        label: cat,
                      }))}
                      error={touched.category && errors.category}
                    />
                  )}
                </div>
              </div>

              {/* SECTION 2: PERSONAL INFO */}
              <div className="bg-white p-6 laptop-sm:p-10 rounded-[2.5rem] shadow-sm border border-lightGray">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold">
                    02
                  </span>
                  <h3 className="text-xl font-black text-grey uppercase tracking-tight">
                    Personal Details
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

              {/* SECTION 3: EDUCATION & SUBMIT */}
              <div className="bg-white p-6 laptop-sm:p-10 rounded-[2.5rem] shadow-sm border border-lightGray">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold">
                    03
                  </span>
                  <h3 className="text-xl font-black text-grey uppercase tracking-tight">
                    Education & Address
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-10">
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
                    disabled={registeringParticipant}
                    variant="primary"
                    className="w-full md:w-auto px-16 py-4 text-lg"
                  >
                    {registeringParticipant ? "Processing..." : "Register Now"}
                  </CommonButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Success Modal */}
      {isModalOpen && modalData && (
        <Modal
          width="600px"
          heading="Registration Confirmed"
          onClose={() => setIsModalOpen(false)}
        >
          <div className="p-4">
            <div className="bg-slate-50 rounded-3xl p-6 space-y-3">
              {Object.entries(modalData).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-[10px] uppercase font-black text-mediumGray tracking-widest">
                    {key}
                  </span>
                  <span className="font-bold text-grey">{value || "—"}</span>
                </div>
              ))}
            </div>
            <CommonButton
              className="w-full mt-6"
              onClick={() => setIsModalOpen(false)}
            >
              Done
            </CommonButton>
          </div>
        </Modal>
      )}
    </Wrapper>
  );
};

export default EventForm;
