import { LightningBoltIcon } from "@radix-ui/react-icons";
import React from "react";
import { Link } from "react-router-dom";

function NavbarExplore() {
  return (
    <Link to={"/explore"}>
      <button
        className="flex w-full h-full gap-4 px-4 py-2 text-sm lg:hidden text-cWhite hover:text-fuchsia-700 hover:transition-colors"
        role="menuitem"
      >
        <LightningBoltIcon className="w-6 h-6" />
        Explore
      </button>
    </Link>
  );
}

export default NavbarExplore;
