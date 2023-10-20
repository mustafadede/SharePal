import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  createNotification,
  followUser,
  getFollowersForUser,
  unfollowUser,
  updateCurrentUserData,
} from "../../../firebase/firebaseActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { followingActions } from "../../../store/followingSlice";
import { userActions } from "../../../store/userSlice";
import { profileActions } from "../../../store/profileSlice";
import { useNavigate } from "react-router-dom";

function UserActionButtons({ profileUser }) {
  const { user } = useSelector((state) => state.user);
  const { followingList } = useSelector((state) => state.following);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getFollowersForUser(localStorage.getItem("user")).then((followers) => {
      dispatch(followingActions.initialFollowing(followers));
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
      toast.success(`You have unfollowed ${profileUser.nick}`);
    } else {
      dispatch(followingActions.updateFollowing({ uid: profileUser.uid, nick: profileUser.nick, photo: profileUser.photo }));
      dispatch(userActions.followUser(followingList.length + 1));
      dispatch(profileActions.updateFollowers(profileUser.followers + 1));
      await updateCurrentUserData(localStorage.getItem("user"), { following: user.following + 1 });
      await updateCurrentUserData(profileUser.uid, { followers: profileUser.followers + 1 });
      await followUser(localStorage.getItem("user"), { following: followingList.length, uid: profileUser.uid });
      toast.success(`You are now following ${profileUser.nick}`);
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
  return (
    <motion.div
      className="flex justify-center w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <button
        className="flex items-center justify-center w-full h-12 transition-all md:w-1/3 bg-fuchsia-800 rounded-2xl hover:bg-slate-900"
        onClick={onClickHandler}
      >
        {followingList.find((user) => user.uid === profileUser?.uid) ? (
          <span className="text-xl text-slate-200">Unfollow</span>
        ) : (
          <span className="text-xl text-slate-200">Follow</span>
        )}
      </button>
    </motion.div>
  );
}

export default UserActionButtons;
