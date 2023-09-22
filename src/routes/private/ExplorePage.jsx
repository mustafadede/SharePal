import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import { motion } from "framer-motion";
import SearchCard from "../../components/layout/SearchPage/SearchCard";
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
          className="flex flex-col w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Slider data={upcoming.results} header="Upcoming" dataClassName="upcoming" />
          <Slider data={top10Movies} header="Top 10 Movies" dataClassName="topMovies" />
          <Slider data={top10Series} header="Top 10 Series" dataClassName="topSeries" />
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
