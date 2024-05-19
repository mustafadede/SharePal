import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function FeedLoading() {
  const { t } = useTranslation();
  const { status } = useSelector((state) => state.posts);

  return <div>{status === "loading" && <p className="w-full mt-1 text-xl text-center text-slate-400">{t("info.loading")}</p>}</div>;
}

export default FeedLoading;
