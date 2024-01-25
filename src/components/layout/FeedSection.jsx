import React, { useState } from "react";
import { motion } from "framer-motion";
import FeedActionBox from "./FeedPage/FeedActionBox";
import FeedTabs from "./FeedPage/FeedTabs";
import FollowingSecctionComponent from "./FollowingSecctionComponent";
import FeedLoading from "./FeedPage/FeedLoading";
import Feeds from "./FeedPage/Feeds";

function FeedSection() {
  const [tab, setTab] = useState(0);

  return (
    <motion.div className="flex flex-col w-full xl:px-6">
      <FeedTabs tabInfo={tab} tab={setTab} info="feed" />
      <FeedActionBox />
      <FeedLoading />
      {tab === 0 && <Feeds tab={tab} />}
      {tab === 1 && <FollowingSecctionComponent />}
    </motion.div>
  );
}

export default FeedSection;
