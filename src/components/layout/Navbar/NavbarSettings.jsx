import { GearIcon } from "@radix-ui/react-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function NavbarSettings() {
  const { t } = useTranslation();
  return (
    <Link to={"/settings"}>
      <button
        className="flex w-full h-full gap-4 px-4 py-2 text-sm text-cWhite hover:text-fuchsia-700 hover:transition-colors"
        role="menuitem"
      >
        <GearIcon className="w-6 h-6" />
        {t("settings.header")}
      </button>
    </Link>
  );
}

export default NavbarSettings;
