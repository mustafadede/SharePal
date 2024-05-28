import React from "react";
import { motion } from "framer-motion";

function DummyListModalCard({ title, poster, releaseDate, backdrop, listNumber, additionalClassName }) {
  return (
    <div>
      <button className="relative flex items-center w-full gap-2 mb-2 cursor-pointer h-fit group rounded-2xl">
        <motion.img
          src={`https://image.tmdb.org/t/p/w500/${backdrop}`}
          alt={title}
          loading="lazy"
          className={`absolute inset-0 object-cover w-full h-full rounded-2xl ${additionalClassName}`}
          variants={additionalClassName}
        />
        <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title} loading="lazy" className="z-10 w-16 h-full rounded-xl" />
        <div className="flex justify-between w-full gap-1 pr-4">
          <p className="z-10 text-lg text-left text-slate-200">
            {listNumber}. {title}
          </p>
          <p className="z-10 text-lg text-slate-400">({releaseDate?.slice(0, 4)})</p>
        </div>
      </button>
    </div>
  );
}

export default DummyListModalCard;
