import React from "react";
import { motion } from "framer-motion";

function AttachCardsSection() {
  const cardInfoList = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      animationDuration: 1.7,
      transition: {
        staggerChildren: 1,
        when: "beforeChildren",
      },
    },
  };

  const item = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

  return (
    <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -60 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col items-center justify-center w-full py-4 overflow-hidden h-96 rounded-2xl">
        <motion.h1 className="text-5xl font-bold text-center text-white lg:text-6xl">
          Welcome to <span className="text-fuchsia-700">SharePal.</span>
        </motion.h1>
        {/* <div className="flex items-center justify-center h-full gap-4 mt-2 text-center sm:flex-col lg:flex-row">
          <motion.div initial="hidden" animate="visible" variants={cardInfoList}>
            <motion.h1 variants={item} className="text-2xl italic font-bold text-white lg:text-3xl">
              List it,
            </motion.h1>
            <motion.h2 variants={item} className="text-2xl italic font-bold text-white lg:text-3xl">
              Track it,
            </motion.h2>
            <motion.h2 variants={item} className="text-2xl italic font-bold text-white lg:text-3xl">
              Recommend it,
            </motion.h2>
            <motion.h2 variants={item} className="text-2xl italic font-bold text-white lg:text-3xl">
              Share it.
            </motion.h2>
          </motion.div>
        </div> */}
      </div>
    </motion.div>
  );
}

export default AttachCardsSection;
