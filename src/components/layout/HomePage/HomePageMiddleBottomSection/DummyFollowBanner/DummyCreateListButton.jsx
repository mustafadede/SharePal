import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
function DummyCreateListButton() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex items-center justify-center w-1/3 h-12 transition-all text-slate-200 bg-slate-600 rounded-2xl"
    >
      <span className="text-md lg:text-xl">{t("user.createList")}</span>
    </motion.div>
  );
}

export default DummyCreateListButton;
