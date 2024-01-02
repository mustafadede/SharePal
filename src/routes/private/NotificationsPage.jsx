import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { motion } from "framer-motion";
import ProfileCard from "../../components/common/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import NotificationFollowCard from "../../components/common/NotificationCard/NotificationFollowCard";
import NotificationListCard from "../../components/common/NotificationCard/NotificationListCard";
import NotificationSuggestCard from "../../components/common/NotificationCard/NotificationSuggestCard";
import MyPinnedListsCard from "../../components/common/MyPinnedListsCard/MyPinnedListsCard";
import {
  deleteUserNotification,
  getCurrentUserData,
  getFollowersForUser,
  getNotifications,
  getSelectedUserFollowing,
  getSelectedUserLists,
} from "../../firebase/firebaseActions";
import { followersActions } from "../../store/followersSlice";
import { followingActions } from "../../store/followingSlice";
import { userActions } from "../../store/userSlice";
import { MyListsActions } from "../../store/myListsSlice";
import { notificationActions } from "../../store/notificationSlice";
import NotificationLikeCard from "../../components/common/NotificationCard/NotificationLikeCard";
import { TrashIcon } from "@radix-ui/react-icons";
import InfoLabel from "../../components/common/InfoLabel";
import FeedTabs from "../../components/layout/FeedPage/FeedTabs";

function NotificationsPage() {
  const { user } = useSelector((state) => state.user);
  const { notificationList, status } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.setItem("lookUpDate", JSON.stringify(new Date().toISOString()));
    const getNotificationsData = async () => {
      if (notificationList.length === 0) {
        dispatch(notificationActions.updateStatus("loading"));
        const notifications = await getNotifications(localStorage.getItem("user"));
        !notifications &&
          dispatch(notificationActions.updateStatus("error")) &&
          localStorage.setItem("notifications", JSON.stringify(false));
        notifications && dispatch(notificationActions.setNotification(notifications)) && dispatch(notificationActions.updateStatus("done"));
      }
    };
    getNotificationsData();
    const getData = async () => {
      const userData = await getCurrentUserData(localStorage.getItem("user"));
      userData && dispatch(userActions.updateUser(userData));
      const response = await getSelectedUserFollowing(localStorage.getItem("user"));
      response && dispatch(followingActions.initialFollowing(response));
      const followers = await getFollowersForUser(localStorage.getItem("user"));
      followers && dispatch(followersActions.initialFollowers(followers));
    };
    getData();
    const getUserLists = async () => {
      const res = await getSelectedUserLists(localStorage.getItem("user"));
      dispatch(MyListsActions.initilizeList(res));
    };
    getUserLists();
  }, []);

  const handleDeletion = () => {
    deleteUserNotification(localStorage.getItem("user")).then(() => {
      dispatch(notificationActions.setNotification([]));
      dispatch(notificationActions.updateStatus("deleted"));
    });
  };

  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex mx-5 lg:gap-4 xl:gap-0 md:mx-10">
        <motion.div
          className="hidden lg:w-1/4 h-fit lg:flex flex-col sticky top-[4.6rem] bg-cGradient2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ProfileCard
            nick={user?.nick}
            following={user?.following}
            followers={user?.followers}
            quote={user?.quote}
            banner={user?.banner}
          />
          <MyPinnedListsCard />
        </motion.div>
        <motion.div className="w-full h-fit xl:px-6">
          <motion.div className="flex">
            <motion.h1
              className="flex w-full mb-4 text-3xl text-cWhite"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Notifications
            </motion.h1>
            <motion.button
              className="flex items-center justify-center w-12 h-10 transition-all duration-200 rounded-md group hover:bg-fuchsia-600/75"
              onClick={() => handleDeletion()}
            >
              <TrashIcon className="transition-all duration-200 w-7 h-7 text-slate-600 group-hover:text-slate-200" />
            </motion.button>
          </motion.div>
          <FeedTabs tabInfo={tab} tab={setTab} />
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
          {status === "error" && (
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
          {status === "done" &&
            tab === 3 &&
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

          {status === "done" && tab === 1 && <InfoLabel text="Coming soon..." />}
          {status === "done" && tab === 2 && <InfoLabel text="Coming soon..." />}
          {status === "deleted" && notificationList.length === 0 && (
            <InfoLabel text="There is nothing to see. Do some actions. Follow the rabbit hole." />
          )}
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

export default NotificationsPage;
