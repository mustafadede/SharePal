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
      className="flex flex-col items-center justify-center relative top-[-16rem] md:top-[-14rem] lg:top-[-5rem] h-fit"
    >
      <motion.div
        className="hidden lg:flex lg:absolute lg:left-10 h-1/2"
        initial={{ opacity: 0, transition: { duration: 2 } }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.1, duration: 0.4 }}
        exit={{ opacity: 0 }}
      >
        <HomeAttachCard />;
      </motion.div>
      <SearchCardModalAsset />
      <motion.div
        className="hidden lg:flex lg:absolute right-[-4rem] lg:right-0"
        initial={{ opacity: 0, transition: { duration: 2 } }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 0.4 }}
        exit={{ opacity: 0 }}
      >
        <HomeAttachCard1 />;
      </motion.div>
    </motion.div>
  );
}

export default HomePageMiddleTopSection;
