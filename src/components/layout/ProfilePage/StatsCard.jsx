import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import RecentlyComponent from "./StatsSection/RecentlyComponent";
import CurrentlyWatching from "./StatsSection/CurrentlyWatching";
import FavMovieThisYear from "./StatsSection/FavMovieThisYear";
import FavSeriesThisYear from "./StatsSection/FavSeriesThisYear";

function StatsCard({ user, username }) {
  const navigate = useNavigate();

  return (
    <motion.div className="flex items-center w-full h-fit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
      <div className="flex flex-col w-full gap-6 lg:flex-row">
        <CurrentlyWatching username={username} user={user} navigate={navigate} />
        <div className="flex flex-row gap-6 lg:flex-col">
          {/* <FavMovieThisYear user={user} />
          <FavSeriesThisYear user={user} /> */}
        </div>
        {/* <div className="flex flex-col justify-center w-full gap-4 p-4 rounded-xl bg-slate-900">
          <p className="text-3xl font-bold text-slate-200">Recently watched</p>
          <RecentlyComponent user={user} />
        </div> */}
      </div>
    </motion.div>
  );
}

export default StatsCard;
