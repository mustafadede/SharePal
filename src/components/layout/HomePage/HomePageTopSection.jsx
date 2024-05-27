import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function HomePageTopSection() {
  const { t } = useTranslation();
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
  const item = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 }, exit: { opacity: 0 } };

  return (
    <motion.div initial="hidden" animate="visible" variants={cardsList} className="flex flex-col-reverse mt-2 lg:flex-row">
      <motion.div variants={item} className="w-full h-72 lg:h-96 rounded-3xl bg-gradient-to-b to-cGradient2 from-fuchsia-800/90">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardInfoList}
          className="flex flex-col items-center justify-center h-full gap-2 lg:gap-4"
        >
          <motion.h1 variants={item} className="text-4xl font-bold text-white lg:text-5xl">
            {t("home.topFirst")}
          </motion.h1>
          <motion.h2 variants={item} className="text-4xl font-bold text-white lg:text-5xl">
            {t("home.topSecond")}
          </motion.h2>
          <motion.h2
            variants={item}
            className="text-3xl font-bold text-transparent bg-gradient-to-t from-fuchsia-900 to-fuchsia-500 bg-clip-text lg:text-5xl"
          >
            {t("home.topThird")}
          </motion.h2>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default HomePageTopSection;
