import React from "react";
import { motion } from "framer-motion";
import FeedTab from "../../common/FeedTabs/FeedTab";
import ActivitiesTab from "../../common/FeedTabs/ActivitiesTab";
import NotificationTab from "../../common/FeedTabs/NotificationTab";
function FeedTabs({ tabInfo, tab, info }) {
  return (
    <motion.div
      className={
        info === "feed"
          ? "sticky flex items-center w-full h-12 mb-4 shadow-xl top-[4.5rem] backdrop-blur bg-slate-900/70 transition-all z-20 rounded-xl"
          : "sticky flex items-center w-full h-12 mb-6 shadow-xl top-1 backdrop-blur bg-slate-900/70 transition-all z-20 rounded-xl"
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {info === "feed" ? (
        <FeedTab tabInfo={tabInfo} tab={tab} />
      ) : info === "activities" ? (
        <ActivitiesTab tabInfo={tabInfo} tab={tab} />
      ) : (
        <NotificationTab tabInfo={tabInfo} tab={tab} />
      )}
    </motion.div>
  );
}

export default FeedTabs;
