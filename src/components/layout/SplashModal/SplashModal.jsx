import React from "react";
import SplashModalBottom from "./SplashModalBottom";
import SplashModalCenter from "./SplashModalCenter";

function SplashModal() {
  return (
    <div
      className="bg-slate-900 relative w-96 px-4 h-[20.5rem] md:w-[40rem] lg:w-[43rem] md:h-[27rem] lg:h-[30rem] rounded-2xl overflow-hidden overflow-y-scroll no-scrollbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <SplashModalCenter />
      <SplashModalBottom />
    </div>
  );
}

export default SplashModal;
