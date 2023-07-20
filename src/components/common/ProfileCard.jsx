import { NavLink } from "react-router-dom";

const ProfileCard = ({ nick = "-", username, following = "-", followers = "-" }) => {
  return (
    <div className="w-80 h-fit bg-slate-900 rounded-2xl flex flex-col z-0">
      <div className="relative h-28">
        <div className="h-24 bg-slate-700 rounded-t-2xl"></div>
        <div className="rounded-full h-20 w-20 bg-fuchsia-600 absolute top-11 left-1/2 transform -translate-x-1/2"></div>
      </div>
      <div className="flex flex-col justify-center items-center pt-5">
        <p className="text-xl text-slate-200">{username}</p>
        <p className="text-md text-slate-400">@{nick}</p>
        <p className="text-sm xl:text-lg text-slate-300 pt-2 text-center px-6">
          Some old wounds never truly heal, and bleed again at the slightest word.
        </p>
      </div>
      <div className="flex justify-around text-center pt-2">
        <div className="flex flex-col ">
          <p className="text-lg text-slate-200">{followers}</p>
          <p className="text-sm text-slate-300">Followers</p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg text-slate-200">{following}</p>
          <p className="text-sm text-slate-300">Following</p>
        </div>
      </div>
      <p className="text-lg text-purple-400 hover:text-slate-300 transition-colors flex items-center justify-center py-4">
        <NavLink to={"/profile"}>Go to Profile</NavLink>
      </p>
    </div>
  );
};

export default ProfileCard;
