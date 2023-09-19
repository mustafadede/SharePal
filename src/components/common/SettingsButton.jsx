import React from "react";
import { motion } from "framer-motion";
function SettingsButton({ title, handleSelection }) {
  return (
    <motion.button
      className="w-full h-16 text-center transition-all lg:pl-4 lg:text-left rounded-xl text-slate-400 hover:text-slate-200 hover:bg-cGradient2"
      onClick={() => handleSelection(title)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {title}
    </motion.button>
  );
}

export default SettingsButton;
