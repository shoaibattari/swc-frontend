// src/components/landing/HeroSection.jsx
import { useNavigate } from "react-router-dom";
import { CommonButton, Wrapper } from "../../common";
import { IoAddCircle } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="min-h-screen flex flex-col justify-start items-center text-center">
        <img src="./logo.png" alt="logo" className="h-32" />

        {/* heading */}
        <h1 className="text-[2.5rem] phone:text-[3rem] tablet:text-[4rem] laptop:text-[5rem] font-extrabold text-primary drop-shadow-lg animate-fade-in-scale">
          COMING <span className="text-blue">SOON</span>
        </h1>
        <h2 className="text-[1.8rem] phone:text-[2.5rem] tablet:text-[3rem] laptop:text-[4rem] font-nunito font-bold text-green animate-fade-in-right">
          OKHAI MEMON JAMAT{" "}
        </h2>
        <h2 className="text-[1.8rem] phone:text-[2.5rem] tablet:text-[3rem] laptop:text-[4rem] font-nunito font-bold text-primary animate-fade-in-scale">
          SOCIAL WELFARE <span className="text-blue"> COMMITTEE</span>
        </h2>
        <h2 className="text-[1.8rem] phone:text-[2.5rem] tablet:text-[3rem] laptop:text-[4rem] font-nunito font-bold text-grey animate-fade-in-right">
          BIG <span className="text-orange">SURPRISE</span>
        </h2>

        <p className="text-mediumGray  text-base tablet:text-lg laptop:text-xl max-w-lg animate-fade-slide">
          Something exciting is coming your way. Stay tuned!
        </p>
        <div className="flex flex-col tablet:flex-row justify-center items-center gap-2 pt-4">
          <CommonButton
            onClick={() => navigate("/course-form")}
            rightIcon
            variant="primary"
            size="md"
          >
            Course Admission Form
          </CommonButton>
          <CommonButton
            onClick={() => navigate("/event-form")}
            rightIcon
            variant="secondary"
            size="md"
          >
            Event Registration Form
          </CommonButton>
          <CommonButton
            onClick={() => navigate("/login")}
            rightIcon
            variant="primary"
            size="md"
          >
            Admin
          </CommonButton>
        </div>

        <div className="fixed bottom-0 text-sm bg-black/50 w-full py-5 text-white animate-fade-in-scale">
          © {new Date().getFullYear()} — All Rights Reserved
        </div>
      </div>
    </Wrapper>
  );
};

export default HeroSection;
