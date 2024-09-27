import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Slider from "../../../common/Slider";

function ExploreCards({ nowPlaying, upcoming, nextYear, top10Movies, top10Series }) {
  const { t } = useTranslation();
  return (
    <motion.div
      className="flex flex-col w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <motion.div
        className={`lg:flex w-full flex-col h-full mt-4 gap-2 overflow-hidden overflow-x-auto no-scrollbar`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Slider data={nowPlaying.results} sliderType="movie" header={t("explore.nowPlaying")} dataClassName="topSeries" />
      </motion.div>
      <motion.div
        className={`flex flex-col w-full h-full mt-4 gap-2`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Slider data={upcoming.results} sliderType="movie" header={t("explore.upcoming")} dataClassName="upcoming" />
      </motion.div>
      <motion.div
        className={`flex flex-col w-full h-full mt-4 gap-2`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Slider data={nextYear.results} sliderType="movie" header={t("explore.nextYear")} dataClassName="upcoming" />
      </motion.div>
      <motion.div
        className={`flex flex-col w-full h-full mt-4 gap-2 overflow-hidden overflow-x-auto no-scrollbar`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Slider data={top10Movies} sliderType="movie" header={t("explore.topMovies")} dataClassName="topMovies" />
      </motion.div>
      <motion.div
        className={`flex flex-col h-full mt-4 gap-2 overflow-hidden overflow-x-auto no-scrollbar`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Slider data={top10Series} sliderType="tv" header={t("explore.topSeries")} dataClassName="topSeries" />
      </motion.div>
    </motion.div>
  );
}

export default ExploreCards;
