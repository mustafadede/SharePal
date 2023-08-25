import React from "react";
import { motion } from "framer-motion";
function InfoCard({ user = { followers: "Loading...", following: "Loading...", topOne: "Loading..." } }) {
  return (
    <motion.div
      className="flex items-center justify-around w-full h-24 bg-slate-900 rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex flex-col items-center">
        <motion.p
          className="text-2xl 2xl:text-xl text-slate-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {user.followers}
        </motion.p>
        <motion.p
          className="text-2xl 2xl:text-xl text-slate-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Followers
        </motion.p>
      </div>
      <p className="text-2xl border-l border-slate-600 h-14"></p>
      <div className="flex flex-col items-center">
        <motion.p
          className="text-2xl 2xl:text-xl text-slate-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {user.following}
        </motion.p>
        <motion.p
          className="text-2xl 2xl:text-xl text-slate-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Following
        </motion.p>
      </div>
      <p className="text-2xl border-l border-slate-600 h-14"></p>
      <div className="flex flex-col items-center">
        <motion.p
          className="text-2xl 2xl:text-xl text-fuchsia-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          #1
        </motion.p>
        <motion.p
          className="text-2xl 2xl:text-xl text-slate-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {user.topOne || "No data"}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default InfoCard;
