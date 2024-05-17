import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCurrentUserData, getFollowersForUser, getSelectedUserFollowing } from "../../firebase/firebaseActions";
import { userActions } from "../../store/userSlice";
import { followersActions } from "../../store/followersSlice";
import { followingActions } from "../../store/followingSlice";
import { useTranslation } from "react-i18next";

const ProfileCard = () => {
  const { t } = useTranslation();
  const photo = getAuth().currentUser?.photoURL;
  const { followingList } = useSelector((state) => state.following);
  const { followersLists } = useSelector((state) => state.followers);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const getData = async () => {
      const userData = await getCurrentUserData(localStorage.getItem("user"));
      userData && dispatch(userActions.updateUser(userData));
      const response = await getSelectedUserFollowing(localStorage.getItem("user"));
      response && dispatch(followingActions.initialFollowing(response));
      const followers = await getFollowersForUser(localStorage.getItem("user"));
      followers && dispatch(followersActions.initialFollowers(followers));
    };
    getData();
  }, []);
  return (
    <div className="flex flex-col lg:w-56 xl:w-72 h-fit bg-slate-900 rounded-2xl">
      <div className="relative h-28">
        {!user?.banner && <div className="absolute object-cover object-top w-full h-24 bg-slate-700 rounded-t-2xl opacity-90"></div>}
        {user?.banner && (
          <img
            className="object-cover object-top w-full h-24 bg-slate-700 rounded-t-2xl opacity-90"
            src={user?.banner}
            loading="lazy"
            alt="banner"
          ></img>
        )}
        {photo && (
          <img
            className="absolute object-cover w-20 h-20 transform -translate-x-1/2 rounded-full bg-fuchsia-600 top-11 left-1/2"
            src={photo}
            alt="profile"
            loading="lazy"
          ></img>
        )}
        {!photo && (
          <div className="absolute flex items-center justify-center w-20 h-20 transform -translate-x-1/2 rounded-full bg-fuchsia-600 top-11 left-1/2"></div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center pt-5">
        <p className="text-xl text-slate-200">{user?.username}</p>
        <p className="text-md text-slate-400">@{user?.nick}</p>
        <p className="px-6 pt-2 text-sm text-center xl:text-lg text-slate-300">{user?.quote}</p>
      </div>
      <div className="flex justify-around pt-2 text-center">
        <div className="flex flex-col ">
          <p className="text-lg text-slate-200">{followersLists?.length || 0}</p>
          <p className="text-sm text-slate-300">{t("profileCard.followers")}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg text-slate-200">{followingList?.length || 0}</p>
          <p className="text-sm text-slate-300">{t("profileCard.following")}</p>
        </div>
      </div>
      <p className="flex items-center justify-center py-4 text-lg transition-colors text-fuchsia-400 hover:text-slate-300">
        <NavLink to={"/profile"}>{t("profileCard.button")}</NavLink>
      </p>
    </div>
  );
};

export default ProfileCard;
