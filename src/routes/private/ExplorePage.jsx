import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { motion } from "framer-motion";
import useUpcoming from "../../hooks/useUpcoming";
import useNowPlaying from "../../hooks/useNowPlaying";
import useTop10 from "../../hooks/useTop10";
import Slider from "../../components/common/Slider";
import useNextYear from "../../hooks/useNextYear";
import PopularSection from "../../components/layout/PopularSection";
import { useTranslation } from "react-i18next";

function ExplorePage() {
  const { t } = useTranslation();
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nextYear, setNextYear] = useState([]);
  const [top10Movies, setTop10Movies] = useState([]);
  const [top10Series, setTop10Series] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    useNowPlaying(setNowPlaying);
    useUpcoming(setUpcoming);
    useNextYear(setNextYear);
    useTop10("series", setTop10Series);
    useTop10("movies", setTop10Movies);
  }, []);

  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex gap-6 pb-5 mx-5 md:mx-10">
        <motion.div
          className="flex flex-col w-full lg:w-3/4 2xl:w-4/5"
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
        {/* Most popular movies and series start */}
        <PopularSection />
        {/* Most popular movies and series end */}
      </div>
    </>
  );
}

export default ExplorePage;
