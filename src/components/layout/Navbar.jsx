import React from "react";
import NavbarLogo from "./Navbar/NavbarLogo";
import NavbarNotLoggedInLayout from "./Navbar/NavbarNotLoggedInLayout";
import NavbarLoggedInLayout from "./Navbar/NavbarLoggedInLayout";

function Navbar({ isNotLoggedin = true, additionalClasses = "" }) {
  return (
    <nav className={`flex flex-wrap items-center justify-between py-4 mx-5 md:mx-10 ${additionalClasses}`}>
      <NavbarLogo />
      <div className="flex gap-2 md:gap-4">{isNotLoggedin ? <NavbarNotLoggedInLayout /> : <NavbarLoggedInLayout />}</div>
    </nav>
  );
}

export default Navbar;
