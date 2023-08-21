import React from "react";
import Navbar from "../../components/layout/Navbar";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import { motion } from "framer-motion";

function ExplorePage() {
  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex gap-6 mx-10">
        <motion.div
          className="flex flex-col w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="mb-4 text-3xl text-slate-200">Explore</h1>
          <motion.div
            className="w-full h-32 bg-slate-900 rounded-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          ></motion.div>
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
