import React from "react";
import Navbar from "../../components/layout/Navbar";
import PopularSection from "../../components/layout/PopularSection";
import ProfileWithListSection from "../../components/layout/ProfileWithListSection";
import NotificationsSection from "../../components/layout/NotificationPage/NotificationsSection";

function NotificationsPage() {
  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex mx-5 lg:gap-4 xl:gap-0 md:mx-10">
        <ProfileWithListSection />
        <NotificationsSection />
        <PopularSection />
      </div>
    </>
  );
}

export default NotificationsPage;
