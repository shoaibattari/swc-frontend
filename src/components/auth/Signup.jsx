import React from "react"; // Fixed: React import added
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInput, Wrapper, CommonButton } from "../index";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const SignupForm = () => {
  const { register, isRegistering } = useAuthContext();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSignup = (values, { resetForm }) => {
    register(values);
    // Note: resetForm tab karein jab registration success ho jaye
  };

  return (
    <Wrapper className="py-4 laptop-sm:py-12  flex items-center justify-center font-outfit">
      <div className="w-full max-w-md mx-auto">
        {/* Elite Header */}
        <div className="text-center mb-4">
          <h2 className="text-4xl font-black text-grey tracking-tight">
            Create Account
          </h2>
          <p className="mt-3 text-mediumGray font-medium">
            Join the OMJ community today.
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white p-8 laptop-sm:p-10 rounded-[2.5rem] shadow-sm border border-lightGray">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form className="space-y-6">
                <CustomInput
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                />

                <CustomInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                />

                <CustomInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                  showPasswordToggle
                />

                <div className="pt-4">
                  <CommonButton
                    disabled={isRegistering}
                    type="submit"
                    variant="primary"
                    className="w-full py-4 text-lg shadow-lg shadow-primary/20"
                  >
                    {isRegistering ? "Creating Account..." : "Sign Up"}
                  </CommonButton>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-8 pt-6 border-t border-lightGray text-center">
            <p className="text-mediumGray font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-bold hover:underline ml-1"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-8 text-xs text-mediumGray/60 px-6">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </Wrapper>
  );
};

export default SignupForm;
