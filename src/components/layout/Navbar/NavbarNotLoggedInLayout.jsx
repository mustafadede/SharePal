import React from "react";
import SecondaryButton from "../../common/SecondaryButton";
import PrimaryButton from "../../common/PrimaryButton";
import { useTranslation } from "react-i18next";

function NavbarNotLoggedInLayout() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  return (
    <>
      <button
        className="flex px-3 py-2 bg-fuchsia-600/50 rounded-xl"
        onClick={() => i18n.changeLanguage(i18n.language === "tr" ? "en" : "tr")}
      >
        <p className="text-lg text-white">{i18n.language === "en" ? "TR" : "EN"}</p>
      </button>
      <SecondaryButton title={t("navbar.signup")} whereTo={"/signup"} />
      <PrimaryButton title={t("navbar.login")} whereTo={"/login"} />
    </>
  );
}

export default NavbarNotLoggedInLayout;
