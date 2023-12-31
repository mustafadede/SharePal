import React from "react";
import { motion } from "framer-motion";
function FeedActionBoxButton({ icons, text, onClickAction, check = false }) {
  return (
    <motion.button
      className={
        check
          ? "flex items-center h-12 px-4 transition-all rounded-lg w-100 bg-slate-800"
          : "flex items-center h-12 px-4 transition-all rounded-lg w-100 hover:bg-slate-800"
      }
      onClick={onClickAction}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {icons}
      <span className=" hidden lg:block transition-all w-[8.5rem] h-fit text-md text-slate-200">{text}</span>
    </motion.button>
  );
}

export default FeedActionBoxButton;
