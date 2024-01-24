import { BellIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getNotifications } from "../../../firebase/firebaseActions";
import { notificationActions } from "../../../store/notificationSlice";
import { useDispatch } from "react-redux";

function NavbarNotification() {
  const dispatch = useDispatch();

  useState(() => {
    if (localStorage.getItem("user")) {
      getNotifications(localStorage.getItem("user")).then((notifications) => {
        !notifications && dispatch(notificationActions.updateStatus("error"));
        notifications && dispatch(notificationActions.setNotification(notifications)) && dispatch(notificationActions.updateStatus("done"));
      });
    }
  }, []);

  return (
    <Link to={"/notifications"}>
      <button className="relative flex items-center justify-center rounded w-7 h-7">
        <BellIcon className="w-10 h-10 md:w-6 md:h-6 text-cWhite hover:text-fuchsia-700 hover:transition-colors" />
        {/* {notify && (
        <div className="absolute flex items-center justify-center w-2 h-2 text-xs text-center rounded-full text-cWhite bg-fuchsia-700 -top-0 -right-0"></div>
        )} */}
      </button>
    </Link>
  );
}

export default NavbarNotification;
