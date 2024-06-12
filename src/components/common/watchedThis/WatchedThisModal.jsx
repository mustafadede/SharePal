import React from "react";
import ModalHeader from "../../layout/ModalSkeleton/ModalHeader";
import { useTranslation } from "react-i18next";
import WatchedThisActions from "./WatchedThisActions";
import WatchedThisImages from "./WatchedThisImages";

function WatchedThisModal() {
  const { t } = useTranslation();

  return (
    <div className="p-4 w-80 md:w-[35rem] h-fit bg-slate-900 rounded-2xl overflow-hidden">
      <ModalHeader title={t("watchedThis.title")} />
      <WatchedThisImages />
      <WatchedThisActions />
    </div>
  );
}

export default WatchedThisModal;
