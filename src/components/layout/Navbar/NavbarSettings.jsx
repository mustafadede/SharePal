import { GearIcon } from "@radix-ui/react-icons";
import React from "react";
import { Link } from "react-router-dom";

function NavbarSettings() {
  return (
    <Link to={"/settings"}>
      <button
        className="flex w-full h-full gap-4 px-4 py-2 text-sm text-cWhite hover:text-fuchsia-700 hover:transition-colors"
        role="menuitem"
      >
        <GearIcon className="w-6 h-6" />
        Settings
      </button>
    </Link>
  );
}

export default NavbarSettings;
