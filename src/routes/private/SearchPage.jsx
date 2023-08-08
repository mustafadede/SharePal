import React from "react";
import Navbar from "../../components/layout/Navbar";
import { motion } from "framer-motion";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
function SearchPage() {
  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex mx-10">
        <motion.div className="sticky flex w-full " initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="w-[53.5rem]">
            <h1 className="mb-4 text-3xl text-slate-200">Search</h1>
            <input
              className="w-full py-2 text-2xl text-white transition-all bg-transparent border-b-2 outline-none focus-within:border-slate-900"
              type="text"
              placeholder="Search for a user or movie/series"
            />
          </p>
        </motion.div>
        <motion.div
          className="hidden w-1/3 h-fit lg:flex sticky top-[4.7rem] justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PopularCard />
        </motion.div>
      </div>
    </>
  );
}

export default SearchPage;
