import React, { useState } from "react";
import NotificationHeader from "./NotificationHeader";
import Tabs from "../ProfilePage/Tabs";
import FollowSection from "./FollowSection";
import ActivitiesSection from "./ActivitiesSection";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CounterClockwiseClockIcon, PersonIcon } from "@radix-ui/react-icons";

function NotificationsSection() {
  const { user } = useSelector((state) => state.user);
  const { notificationList, status, followRequestStatus } = useSelector((state) => state.notification);
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useTranslation();
  const tabs = [
    { id: 0, name: t("notification.followRequest"), icon: <PersonIcon className="w-6 h-6" /> },
    { id: 1, name: t("notification.activities"), icon: <CounterClockwiseClockIcon className="w-6 h-6" /> },
  ];

  return (
    <motion.div className="flex flex-col w-full h-fit xl:px-6">
      <NotificationHeader activeTab={activeTab} />
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <FollowSection notificationList={notificationList} activeTab={activeTab} status={status} followRequestStatus={followRequestStatus} />
      {activeTab === 1 && <ActivitiesSection user={user} />}
    </motion.div>
  );
}

export default NotificationsSection;
