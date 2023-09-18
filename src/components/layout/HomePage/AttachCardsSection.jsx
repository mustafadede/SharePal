import React from "react";
import { motion } from "framer-motion";

function AttachCardsSection() {
  return (
    <motion.div nitial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="flex ">
      <div className="w-1/2 "></div>
    </motion.div>
  );
}

export default AttachCardsSection;
