import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileActions } from "../../../store/profileSlice";

function SearchUserCard({ user }) {
  const { user: currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUserClick = () => {
    dispatch(profileActions.removeUser());
    user.displayName === currentUser?.nick ? navigate("/profile") : navigate(`/profile/${user.displayName}`);
  };

  return (
    <button
      onClick={handleUserClick}
      className="relative flex flex-row items-center justify-between w-full overflow-hidden bg-gray-900 rounded-2xl group h-28"
    >
      {user.banner ? (
        <img
          src={user.banner}
          alt={user.displayName}
          className="absolute object-cover w-full transition-all duration-700 opacity-0 group-hover:opacity-40"
        />
      ) : null}
      <div className="z-10 flex flex-row items-center gap-4 p-4">
        {!user.photoURL && <div className="w-16 h-16 rounded-full bg-fuchsia-600"></div>}
        {user.photoURL && <img className="object-cover w-16 h-16 rounded-full" src={user?.photoURL} alt="user" />}
        <div className="flex flex-col items-start">
          <h1 className="text-xl text-white">{user?.displayName}</h1>
          {user.banner ? (
            <p className="text-lg transition-all duration-700 xl:text-md text-slate-300 text-opacity-70 group-hover:text-opacity-0">
              {user?.quote}
            </p>
          ) : (
            <p className="text-lg text-slate-300 text-opacity-70 xl:text-md">{user?.quote}</p>
          )}
        </div>
      </div>
    </button>
  );
}

export default SearchUserCard;
