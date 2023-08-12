import { NavLink } from "react-router-dom";

const ProfileCard = ({ nick = "-", username, following = "-", followers = "-", quote = "-" }) => {
  return (
    <div className="flex flex-col w-72 h-fit bg-slate-900 rounded-2xl">
      <div className="relative h-28">
        <img
          className="object-cover object-top w-full h-24 bg-slate-700 rounded-t-2xl opacity-90"
          src="https://static01.nyt.com/images/2017/04/24/arts/24bates/24bates-videoSixteenByNineJumbo1600.jpg"
        ></img>
        <img
          className="absolute object-cover w-20 h-20 transform -translate-x-1/2 rounded-full bg-fuchsia-600 top-11 left-1/2"
          src="https://avatars.githubusercontent.com/u/95627279?v=4s"
        ></img>
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
      <p className="flex items-center justify-center py-4 text-lg text-purple-400 transition-colors hover:text-slate-300">
        <NavLink to={"/profile"}>Go to Profile</NavLink>
      </p>
    </div>
  );
};

export default ProfileCard;
