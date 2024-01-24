import React from "react";
import { useNavigate } from "react-router-dom";
import { setOnlineStatus } from "../../../firebase/firebaseActions";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { notificationActions } from "../../../store/notificationSlice";
import { followingActions } from "../../../store/followingSlice";
import { toast } from "react-toastify";
import { ExitIcon } from "@radix-ui/react-icons";
import { authActions } from "../../../store/authSlice";
import { followersActions } from "../../../store/followersSlice";
import { useDispatch } from "react-redux";

function NavbarLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutHandler = () => {
    setOnlineStatus(localStorage.getItem("user"), false).then(() => {
      signOut(auth)
        .then(() => {
          dispatch(notificationActions.setNotification([]));
          dispatch(followingActions.resetFollowing());
          dispatch(followersActions.resetFollowers());
          localStorage.removeItem("lookUpDate");
          dispatch(authActions.logout());
          return navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          return toast("Something went wrong!");
        });
    });
  };
  return (
    <button
      onClick={onLogoutHandler}
      className="flex w-full h-full gap-4 px-4 py-2 text-sm text-cWhite hover:text-fuchsia-700 hover:transition-colors"
      role="menuitem"
    >
      <ExitIcon className="w-6 h-6" />
      Log Out
    </button>
  );
}

export default NavbarLogout;
