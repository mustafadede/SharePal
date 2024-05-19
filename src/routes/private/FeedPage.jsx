import React, { useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import { useDispatch } from "react-redux";
import { profileActions } from "../../store/profileSlice";
import { cardActions } from "../../store/cardSlice";
import PopularSection from "../../components/layout/PopularSection";
import FeedSection from "../../components/layout/FeedSection";
import ProfileWithListSection from "../../components/layout/ProfileWithListSection";
import { useTranslation } from "react-i18next";

function FeedPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = t("feed.windowSettingsTitle");
    dispatch(cardActions.resetComments());
    // if (!localStorage.getItem("ss") || !userData.splash) {
    //   dispatch(modalActions.openModal({ name: "splashModal" }));
    // }
    dispatch(profileActions.removeUser(null));
  }, []);
  return (
    <>
      <Navbar
        isNotLoggedin={false}
        additionalClasses="sticky top-0 bg-gradient-to-t from-cGradient2/70 to-cGradient2 backdrop-blur-[2px] z-30"
      />
      <div className="flex mx-5 lg:gap-4 xl:gap-0 md:mx-10">
        <ProfileWithListSection />
        <FeedSection />
        <PopularSection />
      </div>
    </>
  );
}

export default FeedPage;
