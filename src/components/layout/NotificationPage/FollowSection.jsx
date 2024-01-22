import React from "react";
import FollowRequestButton from "./FollowRequestButton";
import NotificationFollowCard from "../../common/NotificationCard/NotificationFollowCard";
import { motion } from "framer-motion";
import FeedCardPageBackButton from "../FeedCardPage/FeedCardPageBackButton";
import InfoLabel from "../../common/InfoLabel";

function FollowSection({ notificationList, status, activeTab, followRequestStatus }) {
  return (
    <div>
      {!followRequestStatus && activeTab === 0 && <FollowRequestButton />}
      {status === "loading" && (
        <motion.h1
          className="w-full p-4 mt-1 text-lg text-center text-slate-400 bg-slate-900 rounded-2xl h-fit"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Loading...
        </motion.h1>
      )}
      {!followRequestStatus &&
        activeTab === 0 &&
        notificationList
          ?.filter((notification) => notification?.type === "follow")
          .reverse()
          .map((notification, index) => (
            <NotificationFollowCard
              key={index}
              uid={notification.from?.uid}
              nick={notification.from?.nick}
              photoURL={notification.from?.photo}
              date={notification?.date}
              deleteId={notification.id}
            />
          ))}
      {followRequestStatus && activeTab === 0 && (
        <div className="mt-2">
          <FeedCardPageBackButton location={true} />
          <InfoLabel text="Coming soon..." />
        </div>
      )}
    </div>
  );
}

export default FollowSection;
