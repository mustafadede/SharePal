import React, { useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import { Link } from "react-router-dom";
import SecondaryButton from "../common/SecondaryButton";
import { ExitIcon, GearIcon, PersonIcon, MagnifyingGlassIcon, BellIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { getNotifications, setOnlineStatus } from "../../firebase/firebaseActions";
import { notificationActions } from "../../store/notificationSlice";
import { followingActions } from "../../store/followingSlice";

const dropdownItems = [
  {
    key: 2,
    title: "Explore",
    icon: <GearIcon className="w-6 h-6" />,
    whereTo: "/explore",
  },
  {
    key: 3,
    title: "Settings",
    icon: <GearIcon className="w-6 h-6" />,
    whereTo: "/settings",
  },
];

function Navbar({ isNotLoggedin = true, additionalClasses = "", onClickHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notify, setNotify] = useState(false);
  const dispatch = useDispatch();
  const { notificationList } = useSelector((state) => state.notification);
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (localStorage.getItem("user") === null) {
      navigate("/");
    } else {
      navigate("/feed", { preventScrollReset: true });
    }
  };

  useState(() => {
    if (localStorage.getItem("user")) {
      getNotifications(localStorage.getItem("user")).then((notifications) => {
        !notifications &&
          dispatch(notificationActions.updateStatus("error")) &&
          localStorage.setItem("notifications", JSON.stringify(false));
        notifications && dispatch(notificationActions.setNotification(notifications));
        notifications && localStorage.getItem("lookUpDate") && setNotify(false);
        notifications && !localStorage.getItem("lookUpDate") && setNotify(true);
      });
    }
    return () => {
      setNotify(false);
    };
  }, []);

  return (
    <nav className={`flex flex-wrap items-center justify-between py-4 mx-5 md:mx-10 ${additionalClasses}`}>
      <div className="flex items-center flex-shrink-0 md:mr-6 bg-gradient-to-r from-cDarkerPurple to-pink-500 bg-clip-text animate-text">
        <button onClick={handleNavigation}>
          <span className="text-4xl font-bold tracking-tight text-transparent cursor-pointer select-none">SharePal</span>
        </button>
      </div>
      <div className="flex gap-2 md:gap-4">
        {isNotLoggedin ? (
          <>
            <SecondaryButton title="Sign Up" whereTo={"/signup"} />
            <PrimaryButton title="Log In" whereTo={"/login"} />
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <Link to={"/notifications"}>
                <button className="relative flex items-center justify-center rounded w-7 h-7" onClick={onClickHandler}>
                  <BellIcon className="w-10 h-10 md:w-6 md:h-6 text-cWhite hover:text-fuchsia-700 hover:transition-colors" />
                  {notify && (
                    <div className="absolute flex items-center justify-center w-2 h-2 text-xs text-center rounded-full text-cWhite bg-fuchsia-700 -top-0 -right-0"></div>
                  )}
                </button>
              </Link>
              <Link to={"/search"}>
                <button className="flex items-center justify-center rounded w-7 h-7">
                  <MagnifyingGlassIcon className="w-10 h-10 md:w-7 md:h-7 text-cWhite hover:text-fuchsia-700 hover:transition-colors" />
                </button>
              </Link>
              <Link to={"/profile"}>
                <button className="flex items-center justify-center rounded w-7 h-7">
                  <PersonIcon className="w-10 h-10 md:w-7 md:h-7 text-cWhite hover:text-fuchsia-700 hover:transition-colors" />
                </button>
              </Link>
            </div>
            <div className="relative">
              <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center rounded w-7 h-7">
                <GearIcon className="w-10 h-10 md:w-7 md:h-7 text-cWhite hover:text-fuchsia-700 hover:transition-colors" />
              </button>
              <div
                className={`absolute text-center right-0 z-10 w-32 mt-2 origin-top-right bg-slate-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link to={"/explore"}>
                    <button
                      className="flex w-full h-full gap-4 px-4 py-2 text-sm lg:hidden text-cWhite hover:text-fuchsia-700 hover:transition-colors"
                      role="menuitem"
                    >
                      <LightningBoltIcon className="w-6 h-6" />
                      Explore
                    </button>
                  </Link>
                  <Link to={"/settings"}>
                    <button
                      className="flex w-full h-full gap-4 px-4 py-2 text-sm text-cWhite hover:text-fuchsia-700 hover:transition-colors"
                      role="menuitem"
                    >
                      <GearIcon className="w-6 h-6" />
                      Settings
                    </button>
                  </Link>
                  <button
                    onClick={() =>
                      setOnlineStatus(localStorage.getItem("user"), false).then(() => {
                        signOut(auth)
                          .then(() => {
                            dispatch(notificationActions.setNotification([]));
                            dispatch(followingActions.resetFollowing());
                            localStorage.removeItem("lookUpDate");
                            dispatch(authActions.logout());
                            return navigate("/login");
                          })
                          .catch((error) => {
                            return toast("Something went wrong!", error.code);
                          });
                      })
                    }
                    className="flex w-full h-full gap-4 px-4 py-2 text-sm text-cWhite hover:text-fuchsia-700 hover:transition-colors"
                    role="menuitem"
                  >
                    <ExitIcon className="w-6 h-6" />
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
