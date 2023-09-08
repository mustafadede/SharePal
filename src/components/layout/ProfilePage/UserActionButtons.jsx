import React, { useState } from "react";
import { motion } from "framer-motion";
import { followUser, unfollowUser, updateCurrentUserData } from "../../../firebase/firebaseActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { followingActions } from "../../../store/followingSlice";
import { userActions } from "../../../store/userSlice";

function UserActionButtons({ profileUser }) {
  const { user } = useSelector((state) => state.user);
  const { followingList } = useSelector((state) => state.following);
  const [follow, setFollow] = useState(false);
  const dispatch = useDispatch();
  const onClickHandler = async () => {
    if (followingList.some((user) => user.uid === profileUser?.uid)) {
      dispatch(followingActions.removeFollowing(profileUser.uid));
      dispatch(userActions.followUser(followingList.length - 1));
      await updateCurrentUserData(localStorage.getItem("user"), { following: followingList.length - 1 });
      await unfollowUser(localStorage.getItem("user"), { uid: profileUser.uid });
      toast.success(`You have unfollowed ${profileUser.nick}`);
      setFollow(false);
    } else {
      dispatch(followingActions.updateFollowing({ uid: profileUser.uid, nick: profileUser.nick, photo: profileUser.photo }));
      dispatch(userActions.followUser(followingList.length + 1));
      await updateCurrentUserData(localStorage.getItem("user"), { following: user.following + 1 });
      await followUser(localStorage.getItem("user"), { following: followingList.length, uid: profileUser.uid });
      toast.success(`You are now following ${profileUser.nick}`);
      setFollow(true);
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
        className="flex items-center justify-center w-1/3 h-12 transition-all bg-fuchsia-800 rounded-2xl hover:bg-slate-900"
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
