import Navbar from "../../components/layout/Navbar";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../../components/common/ProfileCard";
import MyListsCard from "../../components/common/MyListsCard/MyListsCard";
function SettingsPage() {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    document.title = "SharePal | Settings";
    if (localStorage.getItem("user") === null) window.location.href = "/#/login";
  }, []);

  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex mx-10">
        <div className="hidden lg:w-1/4 h-fit lg:flex flex-col sticky top-[4.7rem] bg-cGradient2">
          {user ? <ProfileCard nick={user.nick} following={user.following} followers={user.followers} /> : <ProfileCard />}
          <MyListsCard />
        </div>
        <div className="w-screen px-5 py-4 ml-4 bg-slate-900 rounded-2xl">
          <h1 className="text-3xl text-slate-200">Settings</h1>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
