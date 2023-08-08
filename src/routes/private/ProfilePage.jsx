import React from "react";
import Navbar from "../../components/layout/Navbar";
import ProfileBanner from "../../components/layout/ProfilePage/ProfileBanner";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import { motion } from "framer-motion";
import InfoCard from "../../components/layout/ProfilePage/InfoCard";
import { useSelector } from "react-redux";

function ProfilePage() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex mx-10">
        <div className="flex flex-col w-full gap-4 mr-6 overflow-x-scroll">
          <ProfileBanner user={user} />
          <InfoCard user={user} />
        </div>
        <motion.div
          className="hidden w-fit h-fit lg:flex sticky top-[4.7rem] justify-center"
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

export default ProfilePage;
