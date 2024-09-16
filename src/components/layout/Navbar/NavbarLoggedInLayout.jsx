import React, { useEffect } from "react";
import NavbarNotification from "./NavbarNotification";
import NavbarSearch from "./NavbarSearch";
import NavbarProfile from "./NavbarProfile";
import NavbarOptions from "./NavbarOptions";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";

function NavbarLoggedInLayout() {
  const dispatch = useDispatch();
  const searchListenFunction = (e) => {
    if ((e.altKey && e.key === "k") || e.key === "K") {
      dispatch(modalActions.openModal({ name: "searchModal" }));
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", searchListenFunction);
    return () => {
      document.removeEventListener("keydown", searchListenFunction);
    };
  }, []);
  return (
    <>
      <div className="flex items-center justify-center gap-2 md:gap-4">
        <NavbarNotification />
        <NavbarSearch />
        <NavbarProfile />
      </div>
      <NavbarOptions />
    </>
  );
}

export default NavbarLoggedInLayout;
