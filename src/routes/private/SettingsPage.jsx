import Navbar from "../../components/layout/Navbar";
import React, { useEffect, useState } from "react";
import SettingsButton from "../../components/common/SettingsButton";
import AccountSettings from "../../components/layout/SettingsPage/AccountSettings";
import PrivacySettings from "../../components/layout/SettingsPage/PrivacySettings";
import PreferencesSettings from "../../components/layout/SettingsPage/PreferencesSettings";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProfileWithListSection from "../../components/layout/ProfileWithListSection";
import PasswordSettings from "../../components/layout/SettingsPage/PasswordSettings/PasswordSettings";

function SettingsPage() {
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
    if (selectedSection === "Password") {
      return <PasswordSettings />;
    }
    if (selectedSection === "Privacy") {
      return <PrivacySettings />;
    }
    // if (selectedSection === "Preferences") {
    //   return <PreferencesSettings />;
    // }
  };

  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex flex-col mx-5 lg:flex-row md:mx-10">
        <ProfileWithListSection />
        <motion.div
          className="lg:sticky px-5 mb-4 py-4 lg:ml-4 top-[4.7rem] w-full lg:w-72 bg-slate-900 rounded-2xl h-fit lg:h-[31rem]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="mb-4 text-3xl text-slate-200">Settings</h1>
          <div className="flex lg:flex-col">
            <SettingsButton title="Account" handleSelection={handleSelection} />
            <SettingsButton title="Password" handleSelection={handleSelection} />
            <SettingsButton title="Privacy" handleSelection={handleSelection} />
            {/* <SettingsButton title="Preferences" handleSelection={handleSelection} /> */}
          </div>
        </motion.div>
        {handleSettingsBar()}
      </div>
    </>
  );
}

export default SettingsPage;
