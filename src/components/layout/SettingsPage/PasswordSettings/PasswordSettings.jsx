import React from "react";
import ChangePasswordComponent from "../AccountSettingsComponents/ChangePasswordComponent";
import { motion } from "framer-motion";

function PasswordSettings() {
  return (
    <motion.div
      className="h-full px-5 py-4 mb-10 sm:mt-4 lg:mt-0 lg:ml-4 lg:flex-col lg:w-full lg:flex bg-slate-900 rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <ChangePasswordComponent />
    </motion.div>
  );
}

export default PasswordSettings;
