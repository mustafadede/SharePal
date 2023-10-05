import React, { useEffect } from "react";
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

function NotificationsPage() {
  const { user } = useSelector((state) => state.user);
  const { notificationList, status } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
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
          <motion.h1
            className="flex w-full mb-4 text-3xl text-cWhite"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Notifications
          </motion.h1>
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
          {status === "error" && notificationList.length === 0 && (
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
            notificationList
              ?.map((notification, index) => {
                if (notification?.type === "follow") {
                  return (
                    <NotificationFollowCard
                      key={index}
                      nick={notification.from?.nick}
                      photoURL={notification.from?.photo}
                      date={notification?.date}
                    />
                  );
                }
                if (notification?.type === "like") {
                  return (
                    <NotificationLikeCard
                      key={index}
                      nick={notification.from?.nick}
                      postId={notification.from?.postId}
                      photoURL={notification.from?.photo}
                      date={notification?.date}
                    />
                  );
                }
              })
              .reverse()}
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
