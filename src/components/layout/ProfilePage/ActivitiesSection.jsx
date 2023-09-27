import React, { useEffect } from "react";
import { motion } from "framer-motion";
function ActivitiesSection() {
  useEffect(() => {}, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-96">
      <p className="text-3xl text-slate-200">Coming soon...</p>
    </motion.div>
  );
}

export default ActivitiesSection;
