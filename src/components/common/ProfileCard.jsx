import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ProfileCard = ({ nick, username, following, followers, quote, banner }) => {
  const photo = getAuth().currentUser?.photoURL;

  return (
    <div className="flex flex-col w-72 h-fit bg-slate-900 rounded-2xl">
      <div className="relative h-28">
        {!banner && <div className="absolute object-cover object-top w-full h-24 bg-slate-700 rounded-t-2xl opacity-90"></div>}
        {banner && (
          <img className="object-cover object-top w-full h-24 bg-slate-700 rounded-t-2xl opacity-90" src={banner} alt="banner"></img>
        )}
        {photo && (
          <img
            className="absolute object-cover w-20 h-20 transform -translate-x-1/2 rounded-full bg-fuchsia-600 top-11 left-1/2"
            src={photo}
            alt="profile"
          ></img>
        )}
        {!photo && (
          <div className="absolute flex items-center justify-center w-20 h-20 transform -translate-x-1/2 rounded-full bg-fuchsia-600 top-11 left-1/2"></div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center pt-5">
        <p className="text-xl text-slate-200">{username}</p>
        <p className="text-md text-slate-400">@{nick}</p>
        <p className="px-6 pt-2 text-sm text-center xl:text-lg text-slate-300">{quote}</p>
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
      <p className="flex items-center justify-center py-4 text-lg transition-colors text-fuchsia-400 hover:text-slate-300">
        <NavLink to={"/profile"}>Go to Profile</NavLink>
      </p>
    </div>
  );
};

export default ProfileCard;
