import { LightningBoltIcon } from "@radix-ui/react-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function NavbarExplore() {
  const { t } = useTranslation();
  return (
    <Link to={"/explore"}>
      <button
        className="flex w-full h-full gap-4 px-4 py-2 text-sm lg:hidden text-cWhite hover:text-fuchsia-700 hover:transition-colors"
        role="menuitem"
      >
        <LightningBoltIcon className="w-6 h-6" />
        {t("navbar.explore")}
      </button>
    </Link>
  );
}

export default NavbarExplore;
