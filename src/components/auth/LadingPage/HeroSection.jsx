import { useNavigate } from "react-router-dom";
import { CommonButton } from "../../common";
import {
  FaGraduationCap,
  FaHandsHelping,
  FaRegCalendarCheck,
  FaArrowRight,
  FaVideo,
  FaBook,
} from "react-icons/fa";
import {
  MdOutlineConfirmationNumber,
  MdCastForEducation,
  MdAdminPanelSettings,
} from "react-icons/md";
import { useEffect, useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] font-outfit text-grey">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-lightBlue/50 to-transparent -z-10" />

      {/* Hero Section */}
      <header className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-confirm/20 text-confirm-text font-bold text-sm mb-8 animate-fade-slide">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-confirm-text opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-confirm-text"></span>
          </span>
          New Courses & Events Now Open
        </div>

        {/* Brand Identity */}
        <div className="flex flex-col items-center mb-10">
          <img
            src="./logo.png"
            alt="OMJ Logo"
            className="h-32 md:h-40 mb-6 drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
          />
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-grey leading-tight">
            OKHAI MEMON{" "}
            <span className="text-green underline decoration-lightBlue underline-offset-8">
              JAMAT
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-primary mt-4 tracking-[0.3em] opacity-80 uppercase">
            Social Welfare Committee
          </h2>
        </div>

        {/* Description */}
        <p className="max-w-2xl text-lg md:text-xl text-mediumGray mb-12 leading-relaxed">
          Elevating our community through{" "}
          <span className="text-grey font-bold">digital literacy</span>,
          empowering youth with{" "}
          <span className="text-grey font-bold">modern skills</span>, and
          providing{" "}
          <span className="text-grey font-bold">seamless social support</span>.
        </p>

        {/* Premium Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <CommonButton
            rightIcon={FaArrowRight}
            onClick={() => navigate("/event-form")}
            className="group relative px-10 py-5 bg-green text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-green/20 hover:-translate-y-1 transition-all overflow-hidden"
          >
            Join a Events{" "}
          </CommonButton>

          <CommonButton
            rightIcon={FaArrowRight}
            onClick={() => navigate("/course-form")}
            className="px-10 py-5  border-2 border-primary text-primary rounded-2xl font-bold text-xl shadow-lg  hover:-translate-y-1"
          >
            Join a Course
          </CommonButton>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="mt-12 flex items-center gap-2 text-mediumGray hover:text-primary transition-colors font-semibold"
        >
          <MdAdminPanelSettings className="text-2xl" />
          Admin Portal
        </button>
      </header>

      {/* Stats Section (Added for "Education" focus) */}
      <div className="max-w-5xl mx-auto px-6 -mt-12 mb-24 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard count="50 +" label="Active Courses" />
        <StatCard count="10k +" label="Community Members" />
        <StatCard count="200 +" label="Events Hosted" />
        <StatCard count="1000k +" label="Welfare Fund" />
      </div>

      {/* Services Section with Video/Education Focus */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h3 className="text-green font-bold text-lg mb-2">
                Empowerment Pillars
              </h3>
              <h2 className="text-4xl font-black text-grey">
                Education & Social Welfare
              </h2>
            </div>
            <p className="text-mediumGray max-w-md">
              We provide the tools and resources needed for every member of the
              Jamat to excel in the digital age.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaBook className="text-primary" />}
              title="Digital Library"
              desc="Access course materials, session recordings, and educational PDF resources."
              tag="Education"
            />
            <FeatureCard
              icon={<FaVideo className="text-orange" />}
              title="Video Mentorship"
              desc="Watch exclusive webinars and training videos from industry experts."
              tag="Social"
            />
            <FeatureCard
              icon={<FaHandsHelping className="text-green" />}
              title="Direct Welfare"
              desc="Apply for scholarships and social assistance through our digital portal."
              tag="Welfare"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Count Animation Logic ---
const AnimatedCount = ({ value, duration = 1500 }) => {
  // Extract only numbers from the string (e.g., "10k+" -> 10)
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  // Extract symbols (e.g., "10k+" -> "k+")
  const suffix = value.replace(/[0-9]/g, "");

  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Easing function for smoother finish
      const easeOutQuad = (t) => t * (2 - t);
      const currentCount = Math.floor(easeOutQuad(progress) * numericValue);

      setCount(currentCount);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [numericValue, duration]);

  return (
    <span>
      {count.toLocaleString()}
      <span className="text-primary/80 ml-0.5">{suffix}</span>
    </span>
  );
};

const StatCard = ({ count, label }) => (
  <div className="group bg-white/70 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-sm border border-white/60 text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-white relative overflow-hidden">
    {/* Subtle Animated Background Glow */}
    <div className="absolute -inset-24 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" />

    <div className="relative z-10">
      <div className="text-4xl laptop-sm:text-5xl font-black text-grey tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-500">
        <AnimatedCount value={count} />
      </div>

      <div className="text-[10px] laptop-sm:text-[11px] font-black text-mediumGray uppercase tracking-[0.25em] leading-tight opacity-80 group-hover:opacity-100 transition-opacity">
        {label}
      </div>

      {/* Modern Accent Bar */}
      <div className="flex justify-center gap-1 mt-5">
        <div className="w-1 h-1 bg-primary/20 rounded-full group-hover:scale-150 transition-all duration-300" />
        <div className="w-8 h-1 bg-primary/10 rounded-full group-hover:w-16 group-hover:bg-primary/40 transition-all duration-500" />
        <div className="w-1 h-1 bg-primary/20 rounded-full group-hover:scale-150 transition-all duration-300 delay-75" />
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, desc, tag }) => (
  <div className="bg-white p-10 rounded-[2.5rem] shadow-custom border border-lightGray hover:border-primary transition-all group">
    <div className="inline-block px-3 py-1 rounded-full bg-lightBlue text-primary text-[10px] font-bold uppercase mb-6">
      {tag}
    </div>
    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h4 className="text-2xl font-bold text-grey mb-4">{title}</h4>
    <p className="text-mediumGray leading-relaxed">{desc}</p>
  </div>
);

export default HomePage;
