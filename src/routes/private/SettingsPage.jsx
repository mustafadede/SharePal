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
import { useTranslation } from "react-i18next";

function SettingsPage() {
  const { t, i18n } = useTranslation();
  const [selectedSection, setSelectedSection] = useState("Account");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = t("settings.windowSettingsTitle");
    window.scrollTo(0, 0);
    if (localStorage.getItem("user") === null) navigate("/login");
  }, []);

  useEffect(() => {
    document.title = t("settings.windowSettingsTitle");
    setSelectedSection(t("settings.account"));
  }, [i18n.language, t]);

  const handleSelection = (title) => {
    setSelectedSection(title);
  };

  const handleSettingsBar = () => {
    if (selectedSection === t("settings.account")) {
      return <AccountSettings />;
    }
    if (selectedSection === t("settings.password")) {
      return <PasswordSettings />;
    }
    if (selectedSection === t("settings.privacy")) {
      return <PrivacySettings />;
    }
    if (selectedSection === t("settings.preferences")) {
      return <PreferencesSettings />;
    }
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
          <h1 className="mb-4 text-3xl text-slate-200">{t("settings.header")}</h1>
          <div className="flex lg:flex-col">
            <SettingsButton title={t("settings.account")} handleSelection={handleSelection} />
            <SettingsButton title={t("settings.password")} handleSelection={handleSelection} />
            <SettingsButton title={t("settings.privacy")} handleSelection={handleSelection} />
            <SettingsButton title={t("settings.preferences")} handleSelection={handleSelection} />
          </div>
        </motion.div>
        {handleSettingsBar()}
      </div>
    </>
  );
}

export default SettingsPage;
