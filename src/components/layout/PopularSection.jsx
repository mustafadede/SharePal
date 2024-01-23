import React from "react";
import PopularCard from "../common/MostPopularCard/PopularCard";
import { motion } from "framer-motion";

function PopularSection() {
  return (
    <motion.div
      className="hidden w-1/3 h-fit lg:flex sticky top-[4.7rem] justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <PopularCard />
    </motion.div>
  );
}

export default PopularSection;
