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
    console.log(currentUser);
    user.displayName === currentUser?.nick ? navigate("/profile") : navigate(`/profile/${user.displayName}`);
  };

  return (
    <button onClick={handleUserClick}>
      <div className="flex flex-row items-center justify-between w-full p-4 bg-gray-900 rounded-md">
        <div className="flex flex-row items-center gap-4">
          {!user.photoURL && <div className="w-16 h-16 rounded-full bg-fuchsia-600"></div>}
          {user.photoURL && <img className="object-cover w-16 h-16 rounded-full" src={user?.photoURL} alt="user" />}
          <div className="flex flex-col items-start">
            <h1 className="text-xl text-white">{user?.displayName}</h1>
            <h1 className="text-sm text-gray-500">{user?.email}</h1>
          </div>
        </div>
        {user.displayName !== currentUser?.nick ? (
          <button className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-md bg-slate-900 hover:bg-slate-800">
            Follow
          </button>
        ) : null}
      </div>
    </button>
  );
}

export default SearchUserCard;
