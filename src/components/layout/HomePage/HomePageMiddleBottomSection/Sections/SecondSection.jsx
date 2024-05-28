import React from "react";
import { motion } from "framer-motion";

function SecondSection() {
  return (
    <motion.div
      className="flex flex-col w-1/2 gap-4 px-6 py-10 h-fit bg-slate-900 rounded-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h1 className="text-4xl font-bold text-slate-300">Track it!</h1>
      <p className="text-lg text-slate-300">
        On SharePal, you can track what you've watched and see your statistics on your profile. Mark your shows and movies as watched, not
        watching, or dropped, and share these updates with your friends. Add what you're currently watching to your profile and let your
        friends know. Announce your favorite movie or series of the year, or see the total number of films and series you've watched so far.
      </p>
    </motion.div>
  );
}

export default SecondSection;
