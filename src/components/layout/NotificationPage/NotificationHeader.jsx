import React from "react";
import { motion } from "framer-motion";
import DeleteNotificationButton from "./DeleteNotificationButton";
import { useTranslation } from "react-i18next";

function NotificationHeader({ activeTab }) {
  const { t } = useTranslation();
  return (
    <motion.div className="flex">
      <motion.h1
        className="flex w-full mb-4 text-3xl text-cWhite"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {t("notification.header")}
      </motion.h1>
      {activeTab === 1 && <DeleteNotificationButton />}
    </motion.div>
  );
}

export default NotificationHeader;
