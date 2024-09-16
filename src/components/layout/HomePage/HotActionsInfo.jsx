import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SearchModalAsset from "./SearchModalAsset";

function HotActionsInfo() {
  const { t } = useTranslation();
  const transitionDelay = window.innerWidth >= 768 ? 0.8 : 3.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: transitionDelay }}
      className="w-full h-fit pt-4 relative top-[-26rem] md:top-[-23rem] lg:top-[-4rem]"
    >
      <motion.h1 className="text-4xl text-slate-200">{t("hotActions.title")}</motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: transitionDelay }}
        className="flex gap-4 mt-4"
      >
        <SearchModalAsset />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: transitionDelay }}
          className="w-1/2 h-full p-4 bg-slate-800 rounded-xl"
        >
          <motion.p className="text-2xl text-slate-200">{t("hotActions.desc")}</motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default HotActionsInfo;
