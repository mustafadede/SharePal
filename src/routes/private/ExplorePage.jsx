import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import { motion } from "framer-motion";
import useUpcoming from "../../hooks/useUpcoming";
import useTop10 from "../../hooks/useTop10";
import Slider from "../../components/common/Slider";

function ExplorePage() {
  const [upcoming, setUpcoming] = useState([]);
  const [top10Movies, setTop10Movies] = useState([]);
  const [top10Series, setTop10Series] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    useUpcoming(setUpcoming);
    useTop10("series", setTop10Series);
    useTop10("movies", setTop10Movies);
  }, []);

  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex gap-6 mx-5 md:mx-10">
        <motion.div
          className="flex flex-col w-full lg:w-3/4 2xl:w-4/5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            className={`flex flex-col w-full h-full mt-4 gap-2`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Slider data={upcoming.results} sliderType="movie" header="Upcoming" dataClassName="upcoming" />
          </motion.div>
          <motion.div
            className={`flex flex-col w-full h-full mt-4 gap-2 overflow-hidden overflow-x-auto no-scrollbar`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Slider data={top10Movies} sliderType="movie" header="Top 10 Movies" dataClassName="topMovies" />
          </motion.div>
          <motion.div
            className={`flex flex-col h-full mt-4 gap-2 overflow-hidden overflow-x-auto no-scrollbar`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Slider data={top10Series} sliderType="tv" header="Top 10 Series" dataClassName="topSeries" />
          </motion.div>
          <h2 className="my-4 text-2xl text-slate-200">Users Lists</h2>
        </motion.div>
        {/* Most popular movies and series start */}
        <motion.div
          className="hidden w-fit h-fit lg:flex sticky top-[4.7rem]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PopularCard />
        </motion.div>
        {/* Most popular movies and series end */}
      </div>
    </>
  );
}

export default ExplorePage;
