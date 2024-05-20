import React from "react";
import Slider from "../../../common/Slider";
import { useTranslation } from "react-i18next";
function SearchCardModalBottom({ similar }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col p-6">
        <h1 className="text-4xl text-slate-200">{t("recommendation.title")}</h1>
        {similar?.length ? (
          <Slider data={similar} dataClassName="similar" />
        ) : (
          <p className="mt-4 text-lg text-slate-600">{t("recommendation.notFound")}</p>
        )}
      </div>
    </>
  );
}

export default SearchCardModalBottom;
