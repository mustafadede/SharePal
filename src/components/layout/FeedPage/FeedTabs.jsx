import React from "react";
import { motion } from "framer-motion";
function FeedTabs({ tabInfo, tab }) {
  return (
    <motion.div
      className="sticky flex items-center w-full h-12 mb-4 shadow-xl top-[4.5rem] backdrop-blur bg-slate-900/70 transition-all z-20 rounded-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <button
        className={`flex items-center justify-center w-1/2 h-full transition-all rounded-tl-xl rounded-bl-xl text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/20 ${
          tabInfo === 0 ? "bg-slate-600/20" : null
        }`}
        onClick={() => tab(0)}
      >
        <span className={`text-lg font-semibold ${tabInfo === 0 ? "text-fuchsia-600" : null}`}>Feed</span>
      </button>
      <button
        className={`flex items-center justify-center w-1/2 h-full transition-all rounded-tr-xl rounded-br-xl text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/40 ${
          tabInfo === 1 ? "bg-slate-600/20" : null
        }`}
        onClick={() => tab(1)}
      >
        <span className={`text-lg font-semibold ${tabInfo === 1 ? "text-fuchsia-600" : null}`}>Following</span>
      </button>
    </motion.div>
  );
}

export default FeedTabs;
