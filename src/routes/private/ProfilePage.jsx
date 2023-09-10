import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import ProfileBanner from "../../components/layout/ProfilePage/ProfileBanner";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import { motion } from "framer-motion";
import InfoCard from "../../components/layout/ProfilePage/InfoCard";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../../components/layout/ProfilePage/Tabs";
import PostsSection from "../../components/layout/ProfilePage/PostsSection";
import ListsSection from "../../components/layout/ProfilePage/ListsSection/ListsSection";
import ActivitiesSection from "../../components/layout/ProfilePage/ActivitiesSection";
import {
  getCurrentUserData,
  getFollowersForUser,
  getProfilePhoto,
  getSelectedUserFollowing,
  getUserByTheUsername,
} from "../../firebase/firebaseActions";
import { userActions } from "../../store/userSlice";
import StatsCard from "../../components/layout/ProfilePage/StatsCard";
import { useParams } from "react-router-dom";
import { profileActions } from "../../store/profileSlice";
import UserProfileBanner from "../../components/layout/ProfilePage/UserProfileBanner";
import UserActionButtons from "../../components/layout/ProfilePage/UserActionButtons";
import { followingActions } from "../../store/followingSlice";
import { followersActions } from "../../store/followersSlice";

function ProfilePage() {
  const { username } = useParams();

  const tabs = [
    { id: 0, name: "Stats" },
    { id: 1, name: "Lists" },
    { id: 2, name: "Posts" },
    { id: 3, name: "Activities" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { profileUser } = useSelector((state) => state.profile);
  useEffect(() => {
    document.title = "SharePal | Profile";
    window.scrollTo(0, 0);
    if (!username) {
      const getData = async () => {
        getCurrentUserData(localStorage.getItem("user")).then((userData) => {
          dispatch(userActions.updateUser(userData));
        });
        getSelectedUserFollowing(localStorage.getItem("user")).then((response) => {
          dispatch(followingActions.initialFollowing(response));
          getFollowersForUser(localStorage.getItem("user")).then((followers) => {
            dispatch(followersActions.initialFollowers(followers));
          });
        });
      };
      getData();
    } else {
      const getData = async () => {
        getUserByTheUsername(username).then((userData) => {
          getProfilePhoto(userData[0].uid).then((photo) => {
            dispatch(profileActions.updateUser(...userData));
            dispatch(profileActions.updateProfilePhoto(photo));
          });
        });
      };
      getData();
    }
  }, []);

  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex mx-10">
        <div className="flex flex-col w-full gap-4 mr-6 overflow-x-scroll">
          {username ? <UserProfileBanner user={profileUser} /> : <ProfileBanner user={user} />}
          {username ? <UserActionButtons profileUser={profileUser} /> : null}
          {username ? <InfoCard user={profileUser} /> : <InfoCard user={user} isCurrentUser />}
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 0 && <StatsCard user={!username ? user : profileUser} username={username} />}
          {activeTab === 1 && <ListsSection username={username} />}
          {activeTab === 2 && <PostsSection username={username} uid={profileUser?.uid} />}
          {activeTab === 3 && <ActivitiesSection />}
        </div>
        <motion.div
          className="hidden w-fit h-fit lg:flex sticky top-[4.7rem] justify-center"
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

export default ProfilePage;
