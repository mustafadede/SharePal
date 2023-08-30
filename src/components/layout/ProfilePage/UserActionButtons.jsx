import React from "react";
import { motion } from "framer-motion";

function UserActionButtons() {
  return (
    <motion.div
      className="flex justify-center w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <button className="flex items-center justify-center w-1/3 h-12 transition-all bg-fuchsia-800 rounded-2xl hover:bg-slate-900">
        <span className="text-xl text-slate-200">Follow</span>
      </button>
    </motion.div>
  );
}

export default UserActionButtons;
