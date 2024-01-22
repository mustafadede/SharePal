import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { motion } from "framer-motion";
import ProfileCard from "../../components/common/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
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
import ActivitiesSection from "../../components/layout/NotificationPage/ActivitiesSection";
import Tabs from "../../components/layout/ProfilePage/Tabs";
import NotificationHeader from "../../components/layout/NotificationPage/NotificationHeader";
import FollowSection from "../../components/layout/NotificationPage/FollowSection";

function NotificationsPage() {
  const { user } = useSelector((state) => state.user);
  const { notificationList, status, followRequestStatus } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, name: "Follow Requests" },
    { id: 1, name: "Activities" },
  ];

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
        <motion.div className="flex flex-col w-full h-fit xl:px-6">
          <NotificationHeader activeTab={activeTab} />
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          <FollowSection
            notificationList={notificationList}
            activeTab={activeTab}
            status={status}
            followRequestStatus={followRequestStatus}
          />
          {activeTab === 1 && <ActivitiesSection user={user} />}
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
