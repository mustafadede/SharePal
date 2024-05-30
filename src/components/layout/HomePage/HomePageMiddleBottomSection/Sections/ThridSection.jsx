import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HomeAttachCard2 from "../HomeAttachCard2/HomeAttachCard2";
function ThirdSection() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-0">
      <motion.div
        className="flex flex-col w-full gap-4 px-6 py-10 lg:w-1/2 h-max-fit bg-slate-900 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-xl font-bold lg:text-4xl text-slate-300">{t("tab.thirdTitle")}</h1>
        <p className="text-sm lg:text-lg text-slate-500">{t("tab.thirdText")}</p>
      </motion.div>
      <motion.div
        className="flex items-center justify-center w-full lg:w-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <HomeAttachCard2 />
      </motion.div>
    </div>
  );
}

export default ThirdSection;
