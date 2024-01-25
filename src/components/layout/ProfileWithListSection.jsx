import React from "react";
import ProfileCard from "../common/ProfileCard";
import MyPinnedListsCard from "../common/MyPinnedListsCard/MyPinnedListsCard";
import { motion } from "framer-motion";

function ProfileWithListSection() {
  return (
    <motion.div
      className="hidden lg:w-1/4 h-fit lg:flex flex-col sticky top-[4.6rem] bg-cGradient2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <ProfileCard />
      <MyPinnedListsCard />
    </motion.div>
  );
}

export default ProfileWithListSection;
