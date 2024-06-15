import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SettingsSubTitle from "../../../common/SettingsPage/SettingsSubTitle";
import SelectionComponent from "./SelectionComponent";
import { useDispatch, useSelector } from "react-redux";
import { popularActions } from "../../../../store/popularSlice";

function PopularSelectionSection() {
  const { popularName } = useSelector((state) => state.popular);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handlePopularChange = (event) => {
    const newPopular = event.target.value;
    dispatch(popularActions.updatePopular(newPopular));
  };
  return (
    <div className="flex items-center">
      <SettingsSubTitle title={t("preferences.popular")} />
      <SelectionComponent
        selectedLanguage={popularName}
        handleLanguageChange={handlePopularChange}
        selectionType={"popular"}
        firstTitle={t("preferences.popularFirst")}
        secondTitle={t("preferences.popularSecond")}
        FirstVal={"movies"}
        SecVal={"tv"}
      />
    </div>
  );
}

export default PopularSelectionSection;
