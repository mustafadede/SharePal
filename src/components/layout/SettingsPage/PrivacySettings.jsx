import React from "react";
import { motion } from "framer-motion";
function PrivacySettings() {
  return (
    <motion.div
      className="flex flex-col w-full h-full px-5 py-4 mt-4 lg:ml-4 bg-slate-900 rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="mb-4 text-3xl text-slate-200">Privacy</h1>
      <div className="flex flex-col">
        {/* <SettingsButton title="Edit Profile" />
<SettingsButton title="Change Password" />
<SettingsButton title="Delete Account" /> */}
      </div>
    </motion.div>
  );
}

export default PrivacySettings;
