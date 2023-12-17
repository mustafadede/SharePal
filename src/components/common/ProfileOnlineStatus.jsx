import React from "react";
import { motion } from "framer-motion";
import useOnline from "../../hooks/useOnline";

function ProfileOnlineStatus({ username }) {
  const online = useOnline(username);
  return (
    <motion.div
      aria-label="Online status"
      className={
        online
          ? "absolute z-20 w-4 h-4 bg-green-600 rounded-full bottom-1 border-4 box-content border-slate-900 right-2 md:bottom-3 md:right-4"
          : "absolute z-20 w-4 h-4 rounded-full bottom-1 right-2 md:bottom-3 md:right-4 border-4 box-content border-slate-900 bg-slate-600"
      }
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    ></motion.div>
  );
}

export default ProfileOnlineStatus;
