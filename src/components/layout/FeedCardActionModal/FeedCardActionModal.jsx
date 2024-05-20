import React from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { useSelector } from "react-redux";
import FollowerModalCard from "../FollowerModal/followerModalCard";
import { useTranslation } from "react-i18next";

function FeedCardActionModal() {
  const { t, i18n } = useTranslation();
  const { modalHasData } = useSelector((state) => state.modal);
  return (
    <div className="px-8 pt-4 overflow-hidden bg-slate-900 rounded-2xl w-80 md:w-[30rem] h-96">
      <ModalHeader title={modalHasData.title} />
      <div className="overflow-y-auto no-scrollbar h-[20rem]">
        {modalHasData.ids?.map((item, i) => (
          <FollowerModalCard identify={modalHasData.title} numbers={i} key={i} info={item} />
        ))}
        {!modalHasData.ids && (
          <div className="flex w-full h-full">
            {i18n.language === "en" ? (
              <p className="text-lg text-slate-600">No {modalHasData.title.charAt(0).toLowerCase() + modalHasData.title.slice(1)} yet</p>
            ) : (
              <p className="text-lg text-slate-600">{t("likes.noData")}</p>
            )}
          </div>
        )}
        {modalHasData.ids?.length === 0 && <p className="text-lg text-slate-600">{t("likes.noData")}</p>}
      </div>
    </div>
  );
}

export default FeedCardActionModal;
