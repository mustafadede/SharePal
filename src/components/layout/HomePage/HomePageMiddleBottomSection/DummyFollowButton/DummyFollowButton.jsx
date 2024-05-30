import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function DummyFollowButton() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="flex items-center justify-center w-1/3 h-12 transition-all bg-fuchsia-800 rounded-2xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <span className="text-md lg:text-xl text-slate-200">{t("user.follow")}</span>
    </motion.div>
  );
}

export default DummyFollowButton;
