import React from "react";
import SecondaryButton from "../../common/SecondaryButton";
import PrimaryButton from "../../common/PrimaryButton";
import { useTranslation } from "react-i18next";

function NavbarNotLoggedInLayout() {
  const { t } = useTranslation();
  return (
    <>
      <SecondaryButton title={t("navbar.signup")} whereTo={"/signup"} />
      <PrimaryButton title={t("navbar.login")} whereTo={"/login"} />
    </>
  );
}

export default NavbarNotLoggedInLayout;
