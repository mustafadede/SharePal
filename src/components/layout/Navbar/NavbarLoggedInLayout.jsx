import React from "react";
import NavbarNotification from "./NavbarNotification";
import NavbarSearch from "./NavbarSearch";
import NavbarProfile from "./NavbarProfile";
import NavbarOptions from "./NavbarOptions";

function NavbarLoggedInLayout() {
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
