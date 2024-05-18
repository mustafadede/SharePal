import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { useTranslation } from "react-i18next";

function InfoCard({ user = { followers: "Loading...", following: "Loading...", topOne: "Loading..." }, isCurrentUser = false }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleFollowing = () => {
    isCurrentUser && dispatch(modalActions.openModal({ name: "followerModal", data: { followType: "Following" } }));
  };
  const handleFollowers = () => {
    isCurrentUser && dispatch(modalActions.openModal({ name: "followerModal", data: { followType: "Followers" } }));
  };
  return (
    <motion.div
      className="flex items-center justify-around w-full h-24 bg-slate-900 rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex flex-col items-center">
        <motion.p
          className="sm:text-xl md:text-2xl 2xl:text-xl text-slate-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {user?.followers}
        </motion.p>
        <motion.button
          className="sm:text-lg md:text-2xl 2xl:text-xl text-slate-300 hover:underline hover:text-fuchsia-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleFollowers}
        >
          {t("profileCard.followers")}
        </motion.button>
      </div>
      <p className="border-l sm:text-lg md:text-2xl border-slate-600 h-14"></p>
      <div className="flex flex-col items-center">
        <motion.p
          className="sm:text-xl md:text-2xl 2xl:text-xl text-slate-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {user?.following}
        </motion.p>
        <motion.button
          className="cursor-pointer sm:text-lg md:text-2xl 2xl:text-xl text-slate-300 hover:underline hover:text-fuchsia-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleFollowing}
        >
          {t("profileCard.following")}
        </motion.button>
      </div>
      <p className="border-l sm:text-lg md:text-2xl border-slate-600 h-14"></p>
      <div className="flex flex-col items-center">
        <motion.p
          className="sm:text-lg md:text-2xl 2xl:text-xl text-fuchsia-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          #1
        </motion.p>
        <motion.p
          className="sm:text-lg md:text-2xl 2xl:text-xl text-slate-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {user?.topOne || t("stats.noData")}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default InfoCard;
