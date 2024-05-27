import React from "react";
import HomeAttachCard from "./HomeAttachCard";
import HomeAttachCard1 from "./HomeAttachCard1";
import SearchCardModalAsset from "./SearchCardModaAsset";
import { motion } from "framer-motion";
function HomePageMiddleTopSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 2.7, duration: 0.4 }}
      className="hidden lg:flex flex-col items-center justify-center relative top-[-5rem] h-full"
    >
      <motion.div
        className="absolute left-10"
        initial={{ opacity: 0, transition: { duration: 2 } }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.1, duration: 0.4 }}
        exit={{ opacity: 0 }}
      >
        <HomeAttachCard key={"1"} isAttached={true} index={"1"} display={true} />;
      </motion.div>
      <SearchCardModalAsset />
      <motion.div
        className="absolute right-0"
        initial={{ opacity: 0, transition: { duration: 2 } }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 0.4 }}
        exit={{ opacity: 0 }}
      >
        <HomeAttachCard1 key={"1"} isAttached={true} index={"1"} display={true} />;
      </motion.div>
    </motion.div>
  );
}

export default HomePageMiddleTopSection;
