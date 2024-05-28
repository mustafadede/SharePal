import React from "react";
import { motion } from "framer-motion";
function ThirdSection() {
  return (
    <div className="flex">
      <motion.div
        className="flex flex-col w-1/2 gap-4 px-6 py-10 h-fit bg-slate-900 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-4xl font-bold text-slate-300">Recommend it!</h1>
        <p className="text-lg text-slate-300">
          We've mentioned before that you can create lists for your friends on SharePal. 🤓 You can add and update any movie or series to
          your lists, and make real-time recommendations to your friends. Share posts and let all users know about what you're watching. Of
          course, don't forget to attach the show or movie in your post. 😊
        </p>
      </motion.div>
    </div>
  );
}

export default ThirdSection;
