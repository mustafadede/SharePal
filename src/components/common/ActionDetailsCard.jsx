import React from "react";
import { motion } from "framer-motion";

function ActionDetailsCard({ haveBorder = true, haveBottom = true, icon1, icon2, icon3 }) {
  return (
    <motion.div
      className={
        haveBorder
          ? "flex w-full gap-2 p-2 mb-4 border bg-slate-900 rounded-2xl border-slate-600/10"
          : haveBottom
          ? "flex w-full gap-2 p-2 mb-4 bg-slate-900 rounded-2xl"
          : "flex w-full gap-2 py-2 bg-slate-900 rounded-2xl"
      }
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
    >
      {icon1 && icon1}
      {icon2 && icon2}
      {icon3 && icon3}
    </motion.div>
  );
}

export default ActionDetailsCard;
