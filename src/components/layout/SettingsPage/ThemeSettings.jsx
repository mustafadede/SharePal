import React from "react";
import { motion } from "framer-motion";

function ThemeSettings() {
  return (
    <motion.div
      className="flex flex-col w-full h-full px-5 py-4 sm:mt-4 lg:mt-0 lg:ml-4 bg-slate-900 rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="mb-4 text-3xl text-slate-200">Theme</h1>
      <div className="flex flex-col">
        <p className="text-xl text-slate-400">Coming soon...</p>
      </div>
    </motion.div>
  );
}

export default ThemeSettings;
