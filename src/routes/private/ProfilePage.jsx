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
import { getCurrentUserData } from "../../firebase/firebaseActions";
import { userActions } from "../../store/userSlice";
import StatsCard from "../../components/layout/ProfilePage/StatsCard";

function ProfilePage() {
  const tabs = [
    { id: 0, name: "Stats" },
    { id: 1, name: "Lists" },
    { id: 2, name: "Posts" },
    { id: 3, name: "Activities" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "SharePal | Profile";
    const getData = async () => {
      getCurrentUserData(localStorage.getItem("user")).then((userData) => {
        dispatch(userActions.updateUser(userData));
      });
    };
    getData();
  }, []);

  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex mx-10">
        <div className="flex flex-col w-full gap-4 mr-6 overflow-x-scroll">
          {user ? <ProfileBanner user={user} /> : <ProfileBanner />}
          {user ? <InfoCard user={user} /> : <InfoCard />}
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 0 && <StatsCard user={user} />}
          {activeTab === 1 && <ListsSection />}
          {activeTab === 2 && <PostsSection />}
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
