import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import ProfileBanner from "../../components/layout/ProfilePage/ProfileBanner";
import InfoCard from "../../components/layout/ProfilePage/InfoCard";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../../components/layout/ProfilePage/Tabs";
import PostsSection from "../../components/layout/ProfilePage/PostsSection";
import ListsSection from "../../components/layout/ProfilePage/ListsSection/ListsSection";
import ActivitiesSection from "../../components/layout/ProfilePage/ActivitiesSection";
import { getCurrentUserData, getFollowersForUser, getSelectedUserFollowing, getSelectedUserWatched } from "../../firebase/firebaseActions";
import { userActions } from "../../store/userSlice";
import StatsCard from "../../components/layout/ProfilePage/StatsCard";
import { followingActions } from "../../store/followingSlice";
import { followersActions } from "../../store/followersSlice";
import { modalActions } from "../../store/modalSlice";
import { watchedActions } from "../../store/watchedSlice";
import Snowfall from "react-snowfall";
import PopularSection from "../../components/layout/PopularSection";
import { useTranslation } from "react-i18next";
import { BarChartIcon, ChatBubbleIcon, CounterClockwiseClockIcon, TextAlignCenterIcon } from "@radix-ui/react-icons";

function ProfilePage() {
  const { t } = useTranslation();
  const tabs = [
    { id: 0, name: t("profile.stats"), icon: <BarChartIcon className="w-6 h-6" /> },
    { id: 1, name: t("profile.lists"), icon: <TextAlignCenterIcon className="w-6 h-6" /> },
    { id: 2, name: t("profile.posts"), icon: <ChatBubbleIcon className="w-6 h-6" /> },
    { id: 3, name: t("profile.activities"), icon: <CounterClockwiseClockIcon className="w-6 h-6" /> },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(modalActions.closeModal());
    document.title = t("profile.windowSettingsTitle");
    window.scrollTo(0, 0);
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
      getSelectedUserWatched(localStorage.getItem("user")).then((res) => {
        const filteredTVData = res?.filter((item) => item.mediaType === "tv");
        dispatch(userActions.userTotalSeries(filteredTVData.length));
        dispatch(watchedActions.inititilize({ type: "tv", data: filteredTVData }));
      });
      getSelectedUserWatched(localStorage.getItem("user")).then((res) => {
        const filteredMovieData = res?.filter((item) => item.mediaType === "movie");
        dispatch(userActions.userTotalFilms(filteredMovieData.length));
        dispatch(watchedActions.inititilize({ type: "films", data: filteredMovieData }));
      });
    };
    getData();
  }, []);
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
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex mx-5 md:mx-10">
        <div className="flex flex-col w-full gap-4 mb-6 lg:mr-6">
          <ProfileBanner user={user} username={false} />
          <InfoCard user={user} isCurrentUser />
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 0 && <StatsCard user={user} />}
          {activeTab === 1 && <ListsSection uid={user?.uid} />}
          {activeTab === 2 && <PostsSection uid={user?.uid} />}
          {activeTab === 3 && <ActivitiesSection uid={user?.uid} />}
        </div>
        <PopularSection />
      </div>
    </>
  );
}

export default ProfilePage;
