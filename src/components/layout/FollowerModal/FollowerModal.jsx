import React from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { useSelector } from "react-redux";
import FollowerModalCard from "./followerModalCard";
import { useTranslation } from "react-i18next";

function FollowerModal() {
  const { t } = useTranslation();
  const { modalHasData } = useSelector((state) => state.modal);
  const { followingList } = useSelector((state) => state.following);
  const { followersLists } = useSelector((state) => state.followers);

  return (
    <div className="px-8 pt-4 overflow-hidden bg-slate-900 rounded-2xl w-[30rem] h-96">
      <ModalHeader title={modalHasData.followType} />
      <div className="overflow-y-auto no-scrollbar h-[20rem]">
        {modalHasData.followType === t("header.following") &&
          followingList.map((item) => <FollowerModalCard identify={modalHasData.followType} key={item.date} info={item} />)}
        {modalHasData.followType === t("header.followers") &&
          followersLists?.map((item) => <FollowerModalCard identify={modalHasData.followType} key={item.date} info={item} />)}
        {modalHasData.followType === t("header.followers") && (!followersLists || followersLists?.lenght === 0) && (
          <p className="text-2xl text-slate-600">{t("follow.noFollower")}</p>
        )}
        {modalHasData.followType === t("header.following") && (!followingList || followingList.length < 1) && (
          <p className="text-2xl text-slate-600">{t("follow.noFollowing")}</p>
        )}
      </div>
    </div>
  );
}

export default FollowerModal;
