import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";
import { Link } from "react-router-dom";

function NavbarSearch() {
  return (
    <Link to={"/search"}>
      <button className="flex items-center justify-center rounded w-7 h-7">
        <MagnifyingGlassIcon className="w-10 h-10 md:w-7 md:h-7 text-cWhite hover:text-fuchsia-700 hover:transition-colors" />
      </button>
    </Link>
  );
}

export default NavbarSearch;
