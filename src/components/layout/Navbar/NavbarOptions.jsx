import React, { useState } from "react";
import NavbarExplore from "./NavbarExplore";
import NavbarSettings from "./NavbarSettings";
import NavbarLogout from "./NavbarLogout";
import { GearIcon } from "@radix-ui/react-icons";

function NavbarOptions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
          <NavbarExplore />
          <NavbarSettings />
          <NavbarLogout />
        </div>
      </div>
    </div>
  );
}

export default NavbarOptions;
