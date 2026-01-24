import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInput, Wrapper, CommonButton } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { FaLock, FaEnvelope, FaArrowLeft } from "react-icons/fa";

const LoginForm = () => {
  const { login, isLoggingIn } = useAuthContext();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values) => {
    login(values);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden font-outfit">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green/5 rounded-full blur-[120px]" />

      <Wrapper className="z-10 w-full">
        <div className="max-w-md mx-auto">
          {/* Back to Home Link */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-mediumGray hover:text-primary mb-8 transition-colors group"
          >
            <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
            Back to Website
          </button>

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-xl shadow-custom border border-white rounded-[2.5rem] p-10 tablet:p-12 animate-fade-in-scale">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-lightBlue rounded-3xl mb-6 shadow-sm">
                <img src="./logo.png" alt="OMJ Logo" className="h-12 w-auto" />
              </div>
              <h2 className="text-3xl font-black text-grey">Admin Portal</h2>
              <p className="text-mediumGray mt-2 font-medium">
                Please enter your credentials
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form className="space-y-6">
                  <CustomInput
                    label="Official Email"
                    name="email"
                    type="email"
                    placeholder="name@omj.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                  />

                  <CustomInput
                    label="Security Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password}
                    showPasswordToggle
                  />

                  {/* Forgot Password Link */}
                  <div className="flex justify-end">
                    <Link
                      to="/forgot-password"
                      size="sm"
                      className="text-sm font-bold text-primary hover:text-green transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <CommonButton
                    disabled={isLoggingIn}
                    type="submit"
                    className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all ${
                      isLoggingIn
                        ? "bg-mediumGray cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary/90 hover:shadow-primary/20 hover:-translate-y-0.5"
                    }`}
                  >
                    {isLoggingIn ? (
                      <div className="flex justify-center items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verifying...
                      </div>
                    ) : (
                      "Sign In to Dashboard"
                    )}
                  </CommonButton>
                </Form>
              )}
            </Formik>
          </div>

          {/* Footer Note */}
          <p className="text-center mt-8 text-sm text-mediumGray">
            Authorized Personnel Only. © 2026 OMJ Welfare Committee.
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

export default LoginForm;
