import React from "react";
import { motion } from "framer-motion";
import { PlusIcon } from "@radix-ui/react-icons";
function SearchCard({ title, poster, releaseDate }) {
  return (
    <motion.div
      className="relative w-48 h-64 transition-all cursor-pointer rounded-2xl hover:scale-105"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {poster === null && (
        <div className="absolute flex items-center justify-center w-full h-full rounded-2xl bg-gradient-to-t from-transparent to-fuchsia-800"></div>
      )}
      {poster && (
        <img
          className="object-cover w-full h-full brightness-50 rounded-2xl"
          src={`https://image.tmdb.org/t/p/w500/${poster}`}
          alt={title}
        />
      )}
      <motion.h1
        className="absolute w-40 overflow-hidden text-2xl text-ellipsis max-h-16 text-slate-200 bottom-12 left-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="absolute text-fuchsia-600 bottom-5 left-4 bg-slate-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {releaseDate && releaseDate.slice(0, 4)}
      </motion.p>
      <motion.button className="absolute px-2 py-1 text-white transition-all bg-transparent right-1 top-3 rounded-xl hover:text-fuchsia-800">
        <PlusIcon className="w-6 h-6" />
      </motion.button>
    </motion.div>
  );
}

export default SearchCard;
