import React from "react";
import { motion } from "framer-motion";
function FirstSection() {
  return (
    <div className="flex">
      <motion.div
        className="flex flex-col w-1/2 gap-4 px-6 py-10 h-fit bg-slate-900 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-4xl font-bold text-slate-300">List it!</h1>
        <p className="text-lg text-slate-300">
          On SharePal, you can create watchlists for yourself and your friends. Make lists of must-watch films and TV series for your
          friends. Keep track of what you've watched and what you plan to watch. Discover new movies and series and add them to your lists!
        </p>
      </motion.div>
    </div>
  );
}

export default FirstSection;
