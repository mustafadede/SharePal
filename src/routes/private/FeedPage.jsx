import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import ProfileCard from "../../components/common/ProfileCard";
import {
  getAllPosts,
  getCurrentUserData,
  getFollowersForUser,
  getNotifications,
  getSelectedUserFollowing,
  getSelectedUserLists,
} from "../../firebase/firebaseActions";
import MyPinnedListsCard from "../../components/common/MyPinnedListsCard/MyPinnedListsCard";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { profileActions } from "../../store/profileSlice";
import { postsActions } from "../../store/postsSlice";
import { MyListsActions } from "../../store/myListsSlice";
import { userActions } from "../../store/userSlice";
import { followingActions } from "../../store/followingSlice";
import { followersActions } from "../../store/followersSlice";
import { notificationActions } from "../../store/notificationSlice";
import { cardActions } from "../../store/cardSlice";
import PopularSection from "../../components/layout/PopularSection";
import FeedSection from "../../components/layout/FeedSection";

function FeedPage() {
  const { posts, status } = useSelector((state) => state.posts);
  const { post } = useSelector((state) => state.createPost);
  const { user } = useSelector((state) => state.user);
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "SharePal | Feed";
    const getData = async () => {
      dispatch(cardActions.resetComments());
      try {
        const userData = await getCurrentUserData(localStorage.getItem("user"));
        userData && dispatch(userActions.updateUser(userData));
        // if (!localStorage.getItem("ss") || !userData.splash) {
        //   dispatch(modalActions.openModal({ name: "splashModal" }));
        // }
        const response = await getSelectedUserFollowing(localStorage.getItem("user"));
        response && dispatch(followingActions.initialFollowing(response));
        const followers = await getFollowersForUser(localStorage.getItem("user"));
        followers && dispatch(followersActions.initialFollowers(followers));
        const notifications = await getNotifications(localStorage.getItem("user"));
        notifications && dispatch(notificationActions.setNotification(notifications)) && dispatch(notificationActions.updateStatus("done"));
        const res = await getSelectedUserLists(localStorage.getItem("user"));
        dispatch(MyListsActions.initilizeList(res));
        if (tab === 0) {
          dispatch(postsActions.updateStatus("loading"));
          const response = await getAllPosts();
          dispatch(postsActions.updatePosts(response));
          dispatch(postsActions.updateStatus("done"));
        }
      } catch (error) {
        console.log(error);
      }
    };
    dispatch(profileActions.removeUser(null));
    getData();
  }, [tab, post]);
  return (
    <>
      <Navbar
        isNotLoggedin={false}
        additionalClasses="sticky top-0 bg-gradient-to-t from-cGradient2/70 to-cGradient2 backdrop-blur-[2px] z-30"
      />
      <div className="flex mx-5 lg:gap-4 xl:gap-0 md:mx-10">
        <motion.div
          className="hidden lg:w-1/4 h-fit lg:flex flex-col sticky top-[4.6rem] bg-cGradient2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {user ? (
            <ProfileCard
              nick={user?.nick}
              following={user?.following}
              followers={user?.followers}
              quote={user?.quote}
              banner={user?.banner}
            />
          ) : (
            <ProfileCard />
          )}
          <MyPinnedListsCard />
        </motion.div>
        <FeedSection tab={tab} setTab={setTab} posts={posts} status={status} />
        <PopularSection />
      </div>
    </>
  );
}

export default FeedPage;
