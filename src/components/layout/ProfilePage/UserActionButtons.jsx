import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  createNotification,
  followUser,
  getSelectedUserFollowing,
  unfollowUser,
  updateCurrentUserData,
} from "../../../firebase/firebaseActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { followingActions } from "../../../store/followingSlice";
import { userActions } from "../../../store/userSlice";
import { profileActions } from "../../../store/profileSlice";
import { useNavigate } from "react-router-dom";
import { modalActions } from "../../../store/modalSlice";
import { useTranslation } from "react-i18next";

function UserActionButtons({ profileUser }) {
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const { followingList } = useSelector((state) => state.following);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getSelectedUserFollowing(localStorage.getItem("user")).then((followings) => {
      dispatch(followingActions.initialFollowing(followings));
    });
  }, []);

  const onClickHandler = async () => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
      return;
    }
    if (followingList.some((user) => user.uid === profileUser?.uid)) {
      dispatch(followingActions.removeFollowing(profileUser.uid));
      dispatch(userActions.followUser(followingList.length - 1));
      dispatch(profileActions.updateFollowers(profileUser.followers - 1));
      await updateCurrentUserData(localStorage.getItem("user"), { following: followingList.length - 1 });
      await updateCurrentUserData(profileUser.uid, { followers: profileUser.followers - 1 });
      await unfollowUser(localStorage.getItem("user"), { uid: profileUser.uid });
      if (i18n.language === "en") {
        toast.success(`You have unfollowed ${profileUser.nick}`);
      } else {
        toast.success(`${profileUser.nick} takipten çıkarıldı`);
      }
    } else {
      dispatch(followingActions.updateFollowing({ uid: profileUser.uid, nick: profileUser.nick, photo: profileUser.photo }));
      dispatch(userActions.followUser(followingList.length + 1));
      dispatch(profileActions.updateFollowers(profileUser.followers + 1));
      await updateCurrentUserData(localStorage.getItem("user"), { following: user.following + 1 });
      await updateCurrentUserData(profileUser.uid, { followers: profileUser.followers + 1 });
      await followUser(localStorage.getItem("user"), { following: followingList.length, uid: profileUser.uid });
      if (i18n.language === "en") {
        toast.success(`You are now following ${profileUser.nick}`);
      } else {
        toast.success(`${profileUser.nick} takip ediliyor`);
      }
      const date = new Date().toISOString();
      createNotification(profileUser.uid, {
        from: {
          uid: localStorage.getItem("user"),
          nick: user.nick,
          photo: user.photoURL,
        },
        date: date,
        type: "follow",
      });
    }
  };

  const suggestHandler = () => {
    dispatch(modalActions.openModal({ name: "suggestFilmModal" }));
  };

  const createListHandler = () => {
    dispatch(modalActions.openModal({ name: "createFriendList" }));
  };

  return (
    <motion.div
      className="flex justify-center w-full gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <motion
        className="flex items-center justify-center w-full h-12 transition-all cursor-pointer md:w-1/3 bg-fuchsia-800 rounded-2xl hover:bg-slate-900"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={onClickHandler}
      >
        {followingList.find((user) => user.uid === profileUser?.uid) ? (
          <span className="text-md lg:text-xl text-slate-200">{t("user.unfollow")}</span>
        ) : (
          <span className="text-md lg:text-xl text-slate-200">{t("user.follow")}</span>
        )}
      </motion>
      {followingList.find((user) => user.uid === profileUser?.uid) && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center w-full h-12 transition-all cursor-pointer text-slate-200 md:w-1/3 bg-slate-600 rounded-2xl hover:bg-slate-900"
            onClick={createListHandler}
          >
            <span className="text-md lg:text-xl">{t("user.createList")}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center w-full h-12 transition-all cursor-pointer text-slate-200 md:w-1/3 bg-slate-600 rounded-2xl hover:bg-slate-900"
            onClick={suggestHandler}
          >
            <span className="text-md lg:text-xl">{t("user.suggest")}</span>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default UserActionButtons;
