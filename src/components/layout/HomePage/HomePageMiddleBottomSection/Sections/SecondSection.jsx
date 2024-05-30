import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import DummyProfileBanner1 from "../DummyProfileBanner/DummyProfileBanner1";
import DummyCreateListButton from "../DummyFollowBanner/DummyCreateListButton";
import DummyFollowButton from "../DummyFollowButton/DummyFollowButton";

function SecondSection() {
  const { t } = useTranslation();
  return (
    <div className="relative flex flex-col gap-4 lg:flex-row-reverse">
      <motion.div
        className="flex flex-col gap-4 px-6 py-10 lg:w-1/2 h-fit bg-slate-900 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-4xl font-bold text-slate-300">{t("tab.secondTitle")}</h1>
        <p className="text-lg text-slate-300">{t("tab.secondText")}</p>
      </motion.div>
      <motion.div className="flex flex-col justify-center w-full select-none lg:w-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div
          className="relative z-30 top-4 left-[300px] xl:left-80 2xl:left-[420px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <DummyCreateListButton />
        </motion.div>
        <DummyProfileBanner1 />
        <motion.div
          className="relative z-30 left-12 top-[-1rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <DummyFollowButton />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SecondSection;
