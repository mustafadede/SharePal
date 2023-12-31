import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { motion } from "framer-motion";
import InfoCard from "../../components/layout/ProfilePage/InfoCard";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../../components/layout/ProfilePage/Tabs";
import PostsSection from "../../components/layout/ProfilePage/PostsSection";
import ListsSection from "../../components/layout/ProfilePage/ListsSection/ListsSection";
import ActivitiesSection from "../../components/layout/ProfilePage/ActivitiesSection";
import { getProfilePhoto, getSelectedUserWatched, getUserByTheUsername, getUsers } from "../../firebase/firebaseActions";
import StatsCard from "../../components/layout/ProfilePage/StatsCard";
import { useParams } from "react-router-dom";
import { profileActions } from "../../store/profileSlice";
import UserProfileBanner from "../../components/layout/ProfilePage/UserProfileBanner";
import UserActionButtons from "../../components/layout/ProfilePage/UserActionButtons";
import { modalActions } from "../../store/modalSlice";
import FollowCard from "../../components/common/FollowCard/FollowCard";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import InfoLabel from "../../components/common/InfoLabel";
import Snowfall from "react-snowfall";

function UserProfilePage() {
  const { username } = useParams();
  const tabs = [
    { id: 0, name: "Stats" },
    { id: 1, name: "Lists" },
    { id: 2, name: "Posts" },
    { id: 3, name: "Activities" },
  ];
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const { profileUser, profileState } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(profileActions.updateState("loading"));
    dispatch(modalActions.closeModal());
    document.title = "SharePal | " + username;
    window.scrollTo(0, 0);
    const getData = async () => {
      getUserByTheUsername(username).then((userData) => {
        getProfilePhoto(userData[0].uid).then((photo) => {
          dispatch(profileActions.updateUser(...userData));
          dispatch(profileActions.updateProfilePhoto(photo));
          getSelectedUserWatched(userData[0].uid).then((res) => {
            const filteredTVData = res?.filter((item) => item.mediaType === "tv");
            dispatch(profileActions.updateTotalSeries(filteredTVData.length));
          });
          getSelectedUserWatched(userData[0].uid).then((res) => {
            const filteredMovieData = res?.filter((item) => item.mediaType === "movie");
            dispatch(profileActions.updateTotalFilms(filteredMovieData.length));
          });
        });
      });
      getUsers().then((res) => {
        res.map((user) => {
          getProfilePhoto(user.uid).then((photo) => {
            photo && setUsers((prev) => [...prev, { ...user, photoURL: photo }]);
          });
        });
      });
    };
    getData();
    setTimeout(() => {
      dispatch(profileActions.updateState("done"));
    }, 500);
  }, [username]);

  return (
    <>
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: "999",
        }}
      />
      <Navbar
        isNotLoggedin={localStorage.getItem("user") ? false : true}
        additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30"
      />
      <div className="flex mx-5 md:mx-10">
        {profileState === "loading" && (
          <div className="flex flex-col w-full h-screen gap-4 mb-6 lg:mr-6">
            <InfoLabel text="Loading..." additionalClasses="lg:mr-6 h-fit" />
          </div>
        )}
        {profileState === "done" && (
          <div className="flex flex-col w-full gap-4 mb-6 lg:mr-6">
            <UserProfileBanner user={profileUser} />
            <UserActionButtons profileUser={profileUser} />
            <InfoCard user={profileUser} />
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 0 && <StatsCard user={profileUser} username={username} />}
            {activeTab === 1 && <ListsSection username={username} uid={profileUser?.uid} />}
            {activeTab === 2 && <PostsSection username={username} uid={profileUser?.uid} />}
            {activeTab === 3 && <ActivitiesSection username={username} uid={profileUser?.uid} />}
          </div>
        )}
        <motion.div
          className="hidden w-fit h-fit lg:flex sticky top-[4.7rem] justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {localStorage.getItem("user") ? <FollowCard users={users} /> : <PopularCard />}
        </motion.div>
      </div>
    </>
  );
}

export default UserProfilePage;
