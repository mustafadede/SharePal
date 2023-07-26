import { NavLink } from "react-router-dom";

const ProfileCard = ({ nick = "-", username, following = "-", followers = "-" }) => {
  return (
    <div className="z-0 flex flex-col w-72 h-fit bg-slate-900 rounded-2xl">
      <div className="relative h-28">
        <div className="h-24 bg-slate-700 rounded-t-2xl"></div>
        <div className="absolute w-20 h-20 transform -translate-x-1/2 rounded-full bg-fuchsia-600 top-11 left-1/2"></div>
      </div>
      <div className="flex flex-col items-center justify-center pt-5">
        <p className="text-xl text-slate-200">{username}</p>
        <p className="text-md text-slate-400">@{nick}</p>
        <p className="px-6 pt-2 text-sm text-center xl:text-lg text-slate-300">
          Some old wounds never truly heal, and bleed again at the slightest word.
        </p>
      </div>
      <div className="flex justify-around pt-2 text-center">
        <div className="flex flex-col ">
          <p className="text-lg text-slate-200">{followers}</p>
          <p className="text-sm text-slate-300">Followers</p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg text-slate-200">{following}</p>
          <p className="text-sm text-slate-300">Following</p>
        </div>
      </div>
      <p className="flex items-center justify-center py-4 text-lg text-purple-400 transition-colors hover:text-slate-300">
        <NavLink to={"/profile"}>Go to Profile</NavLink>
      </p>
    </div>
  );
};

export default ProfileCard;
