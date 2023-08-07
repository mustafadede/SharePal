import Navbar from "../../components/layout/Navbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../../components/common/ProfileCard";
import MyListsCard from "../../components/common/MyListsCard/MyListsCard";
import SettingsButton from "../../components/common/SettingsButton";
import AccountSettings from "../../components/layout/AccountSettings";
import PrivacySettings from "../../components/layout/PrivacySettings";
import ThemeSettings from "../../components/layout/ThemeSettings";
import { useNavigate } from "react-router-dom";

function SettingsPage() {
  const { user } = useSelector((state) => state.user);
  const [selectedSection, setSelectedSection] = useState("Account");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "SharePal | Settings";
    if (localStorage.getItem("user") === null) navigate("/login");
  }, []);

  const handleSelection = (title) => {
    setSelectedSection(title);
  };

  const handleSettingsBar = () => {
    if (selectedSection === "Account") {
      return <AccountSettings user={user} />;
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
      <div className="flex mx-10">
        <div className="hidden lg:w-1/4 h-fit lg:flex flex-col sticky top-[4.7rem] bg-cGradient2">
          {user ? <ProfileCard nick={user.nick} following={user.following} followers={user.followers} /> : <ProfileCard />}
          <MyListsCard />
        </div>
        <div className="sticky px-5 py-4 ml-4 top-[4.7rem] w-72 bg-slate-900 rounded-2xl h-[30rem]">
          <h1 className="mb-4 text-3xl text-slate-200">Settings</h1>
          <div className="flex flex-col">
            <SettingsButton title="Account" handleSelection={handleSelection} />
            <SettingsButton title="Privacy" handleSelection={handleSelection} />
            <SettingsButton title="Theme" handleSelection={handleSelection} />
          </div>
        </div>
        {handleSettingsBar()}
      </div>
    </>
  );
}

export default SettingsPage;