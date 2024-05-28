import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function SecondSection() {
  const { t } = useTranslation();
  return (
    <>
      <motion.div
        className="flex flex-col w-1/2 gap-4 px-6 py-10 h-fit bg-slate-900 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-4xl font-bold text-slate-300">{t("tab.secondTitle")}</h1>
        <p className="text-lg text-slate-300">{t("tab.secondText")}</p>
      </motion.div>
    </>
  );
}

export default SecondSection;
