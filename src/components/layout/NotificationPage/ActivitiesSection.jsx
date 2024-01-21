import React, { useState } from "react";
import NotificationCommentCard from "../../common/NotificationCard/NotificationCommentCard";
import NotificationLikeCard from "../../common/NotificationCard/NotificationLikeCard";
import InfoLabel from "../../common/InfoLabel";
import { useSelector } from "react-redux";
import FeedTabs from "../FeedPage/FeedTabs";

function ActivitiesSection() {
  const [tab, setTab] = useState(0);
  const { notificationList, status } = useSelector((state) => state.notification);
  const commentTabLength = notificationList?.filter((notification) => notification?.type === "comment").length;

  return (
    <div className="mt-4">
      <FeedTabs tabInfo={tab} tab={setTab} />
      {(status === "error" || (commentTabLength === 0 && tab === 1)) && (
        <motion.h1
          className="w-full p-4 mt-1 text-lg text-center text-slate-400 bg-slate-900 rounded-2xl h-fit"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Try more {user?.nick}. Follow more people. Follow the rabbit hole.
        </motion.h1>
      )}
      {status === "done" &&
        tab === 0 &&
        notificationList
          ?.filter((notification) => notification?.type === "like")
          .reverse()
          .map((notification, index) => (
            <NotificationLikeCard
              key={index}
              uid={notification.from?.uid}
              nick={notification.from?.nick}
              postId={notification.from?.postId}
              photoURL={notification.from?.photo}
              date={notification?.date}
              deleteId={notification.id}
            />
          ))}
      {status === "done" &&
        tab === 1 &&
        notificationList
          ?.filter((notification) => notification?.type === "comment")
          .reverse()
          .map((notification, index) => (
            <NotificationCommentCard
              key={index}
              uid={notification.from?.uid}
              nick={notification.from?.nick}
              postId={notification.from?.postId}
              photoURL={notification.from?.photo}
              date={notification?.date}
              comment={notification.from?.comment}
              deleteId={notification.id}
            />
          ))}
      {status === "done" &&
        tab === 2 &&
        notificationList
          ?.filter((notification) => notification?.type === "repost")
          .reverse()
          .map((notification, index) => (
            <NotificationLikeCard
              key={index}
              uid={notification.from?.uid}
              nick={notification.from?.nick}
              postId={notification.from?.postId}
              photoURL={notification.from?.photo}
              date={notification?.date}
              deleteId={notification.id}
            />
          ))}
      {status === "done" && tab === 2 && <InfoLabel text="Coming soon..." />}
      {status === "deleted" && notificationList.length === 0 && (
        <InfoLabel text="There is nothing to see. Do some actions. Follow the rabbit hole." />
      )}
    </div>
  );
}

export default ActivitiesSection;
