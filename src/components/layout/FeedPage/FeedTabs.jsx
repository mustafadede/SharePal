import React from "react";
import { motion } from "framer-motion";
function FeedTabs({ tabInfo, tab }) {
  return (
    <motion.div
      className="sticky flex items-center w-full h-12 mb-4 shadow-xl top-[4.5rem] backdrop-blur bg-slate-900/70 z-[999] rounded-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <button
        className="flex items-center justify-center w-1/2 h-full transition-all rounded-xl text-slate-300 hover:text-fuchsia-600"
        onClick={() => tab(0)}
      >
        <span className={`text-lg font-semibold ${tabInfo === 0 ? "text-fuchsia-600" : null}`}>Feed</span>
      </button>
      <span className="w-px h-7 bg-slate-600"></span>
      <button
        className="flex items-center justify-center w-1/2 h-full transition-all rounded-xl text-slate-300 hover:text-fuchsia-600"
        onClick={() => tab(1)}
      >
        <span className={`text-lg font-semibold ${tabInfo === 1 ? "text-fuchsia-600" : null}`}>Following</span>
      </button>
    </motion.div>
  );
}

export default FeedTabs;
