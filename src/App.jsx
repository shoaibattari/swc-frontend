import "./App.css";

function App() {
  return (
    <div className="relative  flex flex-col justify-center items-center text-center font-outfit overflow-hidden">
      <video
        autoPlay
        loop
        // muted
        playsInline
        className="absolute inset-0 w-full h-full object-contain opacity-50"
      >
        <source src="/video.mp4" type="video/mp4" />
        {/* fallback text */}
        Your browser does not support the video tag.
      </video>

      <img src="./logo.png" className=" h-1/2" alt="" />

      {/* background glow */}
      <div className="absolute inset-0 bg-black  opacity-20 blur-[100px]" />

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

      <div className="absolute bottom-8 text-sm text-darkGray animate-fade-in-scale">
        © {new Date().getFullYear()} — All Rights Reserved
      </div>
    </div>
  );
}

export default App;
