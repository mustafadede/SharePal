import React from "react";
import { motion } from "framer-motion";
function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <motion.div
      className="flex"
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.4,
      }}
    >
      <div className="flex justify-around w-full gap-4">
        {tabs.map((tab) => (
          <button
            onClick={() => setActiveTab(tab.id)}
            key={tab.id}
            className="relative z-10 flex items-center justify-center w-full h-12 px-4 font-medium text-center transition-all duration-500 bg-transparent outline-none select-none sm:text-md md:text-xl 2xl:text-2xl rounded-2xl"
          >
            {activeTab === tab.id && (
              <motion.div layoutId="selected" className="absolute inset-0 top-0 left-0 bg-fuchsia-800 rounded-2xl" />
            )}
            <span
              className={`${
                activeTab === tab.id ? "relative z-10 text-slate-900 duration-500" : "relative text-slate-200 transition-all z-10"
              }`}
            >
              {tab.name}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default Tabs;
