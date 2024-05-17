import React, { useState } from "react";
import NotificationCommentCard from "../../common/NotificationCard/NotificationCommentCard";
import NotificationLikeCard from "../../common/NotificationCard/NotificationLikeCard";
import InfoLabel from "../../common/InfoLabel";
import { useSelector } from "react-redux";
import FeedTabs from "../FeedPage/FeedTabs";
import { motion } from "framer-motion";
import NotificationSuggestionCard from "../../common/NotificationCard/NotificationSuggestionCard";
import NotificationCommentLikeCard from "../../common/NotificationCard/NotificationCommentLikeCard";
import { useTranslation } from "react-i18next";

function ActivitiesSection({ user }) {
  const { i18n } = useTranslation();
  const [tab, setTab] = useState(0);
  const { notificationList, status } = useSelector((state) => state.notification);
  const commentTabLength = notificationList?.filter((notification) => notification?.type === "comment").length;

  return (
    <div className="mt-4">
      <FeedTabs tabInfo={tab} tab={setTab} />
      {(status === "error" || (commentTabLength === 0 && tab === 2)) &&
        (i18n.language === "en" ? (
          <motion.h1
            className="w-full p-4 mt-1 text-lg text-center text-slate-400 bg-slate-900 rounded-2xl h-fit"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Try more {user?.nick}. Follow more people. Follow the rabbit hole.
          </motion.h1>
        ) : (
          <motion.h1
            className="w-full p-4 mt-1 text-lg text-center text-slate-400 bg-slate-900 rounded-2xl h-fit"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Daha fazla dene {user?.nick}. Daha fazla kişiyi takip et.
          </motion.h1>
        ))}
      {status === "done" &&
        tab === 1 &&
        notificationList
          ?.filter((notification) => notification?.type === "commentLike")
          .reverse()
          .map((notification, index) => (
            <NotificationCommentLikeCard
              key={index}
              uid={notification.from?.uid}
              nick={notification.from?.nick}
              postId={notification.from?.postId}
              commentId={notification.from?.commentId}
              photoURL={notification.from?.photo}
              date={notification?.date}
              deleteId={notification.id}
              attached={notification.from?.attached}
            />
          ))}
      {status === "done" &&
        tab === 0 &&
        notificationList
          ?.filter((notification) => notification?.type === "suggest")
          .reverse()
          .map((notification, index) => (
            <NotificationSuggestionCard
              key={index}
              uid={notification.from?.uid}
              nick={notification.from?.nick}
              photoURL={notification.from?.photo}
              date={notification?.date}
              deleteId={notification.id}
              attached={notification.from?.attached}
            />
          ))}
      {status === "done" &&
        tab === 1 &&
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
        notificationList?.filter((notification) => notification?.type === "like").length === 0 &&
        (i18n.language === "en" ? (
          <motion.h1
            className="w-full p-4 mt-1 text-lg text-center text-slate-400 bg-slate-900 rounded-2xl h-fit"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Try more {user?.nick}. Follow more people. Follow the rabbit hole.
          </motion.h1>
        ) : (
          <motion.h1
            className="w-full p-4 mt-1 text-lg text-center text-slate-400 bg-slate-900 rounded-2xl h-fit"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Daha fazla dene {user?.nick}. Daha fazla kişiyi takip et.
          </motion.h1>
        ))}
      {status === "done" &&
        tab === 0 &&
        notificationList?.filter((notification) => notification?.type === "suggest").length === 0 &&
        (i18n.language === "en" ? (
          <motion.h1
            className="w-full p-4 mt-1 text-lg text-center text-slate-400 bg-slate-900 rounded-2xl h-fit"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Try more {user?.nick}. Follow more people. Follow the rabbit hole.
          </motion.h1>
        ) : (
          <motion.h1
            className="w-full p-4 mt-1 text-lg text-center text-slate-400 bg-slate-900 rounded-2xl h-fit"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Daha fazla dene {user?.nick}. Daha fazla kişiyi takip et.
          </motion.h1>
        ))}
      {status === "done" &&
        tab === 2 &&
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
        tab === 3 &&
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
      {status === "done" && tab === 3 && <InfoLabel text="Coming soon..." />}
    </div>
  );
}

export default ActivitiesSection;
