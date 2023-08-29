import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { PlusIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

function StatsCard({ user }) {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/search");
  };

  return (
    <motion.div className="flex items-center w-full h-fit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
      <div className="flex gap-6">
        <div className="flex flex-col justify-center gap-4 p-4 rounded-xl bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <p className="text-3xl font-bold text-slate-200">Currently Watching</p>
            <button
              className="flex items-center justify-center w-8 h-full translate text-slate-400 hover:text-fuchsia-700"
              onClick={clickHandler}
            >
              <PlusIcon className="w-6 h-full" />
            </button>
          </div>

          {user?.currentlyWatching ? (
            <div className="flex items-center w-64 gap-4">
              <img
                className="object-cover w-16 h-full rounded-2xl"
                src={`https://image.tmdb.org/t/p/w500/${user.currentlyWatching?.poster}`}
                alt={user.currentlyWatching?.title}
              />
              <div className="flex flex-col items-start justify-center gap-1">
                <p className="text-xl font-semibold transition-all text-cWhite">{user.currentlyWatching?.title || "Loading"}</p>
                <p className="transition-all text-md text-slate-400">({user.currentlyWatching?.releaseDate?.slice(0, 4) || "Loading"})</p>
              </div>
            </div>
          ) : (
            <p className="text-xl transition-all text-slate-400">Not watching anything</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default StatsCard;
