import Navbar from "../../components/layout/Navbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../../components/common/ProfileCard";
import MyPinnedListsCard from "../../components/common/MyPinnedListsCard/MyPinnedListsCard";
import SettingsButton from "../../components/common/SettingsButton";
import AccountSettings from "../../components/layout/SettingsPage/AccountSettings";
import PrivacySettings from "../../components/layout/SettingsPage/PrivacySettings";
import ThemeSettings from "../../components/layout/SettingsPage/ThemeSettings";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function SettingsPage() {
  const { user } = useSelector((state) => state.user);
  const [selectedSection, setSelectedSection] = useState("Account");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "SharePal | Settings";
    window.scrollTo(0, 0);
    if (localStorage.getItem("user") === null) navigate("/login");
  }, []);

  const handleSelection = (title) => {
    setSelectedSection(title);
  };

  const handleSettingsBar = () => {
    if (selectedSection === "Account") {
      return <AccountSettings />;
    }
    if (selectedSection === "Privacy") {
      return <PrivacySettings />;
    }
    if (selectedSection === "Theme") {
      return <ThemeSettings />;
    }
  };

  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex flex-col mx-5 lg:flex-row md:mx-10">
        <motion.div
          className="hidden lg:w-1/4 h-fit lg:flex flex-col sticky top-[4.7rem] bg-cGradient2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {user ? (
            <ProfileCard nick={user?.nick} following={user.following} followers={user.followers} quote={user.quote} banner={user.banner} />
          ) : (
            <ProfileCard />
          )}
          <MyPinnedListsCard />
        </motion.div>
        <motion.div
          className="lg:sticky px-5 mb-4 py-4 lg:ml-4 top-[4.7rem] w-full lg:w-72 bg-slate-900 rounded-2xl h-fit lg:h-[31rem]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="mb-4 text-3xl text-slate-200">Settings</h1>
          <div className="flex lg:flex-col">
            <SettingsButton title="Account" handleSelection={handleSelection} />
            <SettingsButton title="Privacy" handleSelection={handleSelection} />
            <SettingsButton title="Theme" handleSelection={handleSelection} />
          </div>
        </motion.div>
        {handleSettingsBar()}
      </div>
    </>
  );
}

export default SettingsPage;
