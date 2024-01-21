import React from "react";
import video from "../../../assets/video-playback.webm";
import { motion } from "framer-motion";

function HomePageTopSection() {
  const cardsList = {
    hidden: {
      y: 10,
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      animationDuration: 2,
      transition: {
        staggerChildren: 1,
        when: "beforeChildren",
      },
    },
  };
  const cardInfoList = {
    hidden: {
      y: 10,
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      animationDuration: 2,
      transition: {
        staggerChildren: 1.2,
      },
    },
  };
  const item = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    <motion.div initial="hidden" animate="visible" variants={cardsList} className="flex flex-col-reverse gap-4 mt-2 lg:flex-row">
      <motion.div variants={item} className="w-100 lg:w-2/3 h-72 lg:h-96 rounded-3xl bg-gradient-to-br to-cGradient1 from-pink-800">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardInfoList}
          className="flex flex-col items-center  justify-center h-full"
        >
          <motion.h1 variants={item} className="mb-4 text-4xl font-bold text-white lg:text-5xl">
            List it,
          </motion.h1>
          <motion.h2 variants={item} className="mb-4 text-4xl font-bold text-white lg:text-5xl">
            Track it,
          </motion.h2>
          <motion.h2 variants={item} className="text-4xl font-bold text-white lg:text-5xl">
            Recommend it.
          </motion.h2>
        </motion.div>
      </motion.div>
      <motion.div
        variants={item}
        className="overflow-hidden h-72 lg:h-auto w-100 lg:w-1/3 bg-gradient-to-br to-cGradient1 from-pink-800 rounded-3xl"
      >
        <video src={video} autoPlay loop muted height="100%" className="object-cover h-full"></video>
      </motion.div>
    </motion.div>
  );
}

export default HomePageTopSection;
