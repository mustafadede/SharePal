import React, { useEffect } from "react";
import { getProfilePhoto, getUserByTheIds } from "../../../firebase/firebaseActions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function FollowerModalCard({ identify, info }) {
  const [data, setData] = React.useState({});
  const user = useSelector((state) => state.user.user?.nick);
  useEffect(() => {
    const getFollowersData = async () => {
      getUserByTheIds(info.uid).then((res) => {
        getProfilePhoto(info.uid).then((photo) => {
          const data = {
            ...res,
            photo,
          };
          setData(data);
        });
      });
    };
    const getFollowingData = async () => {
      getUserByTheIds(info.uid).then((res) => {
        getProfilePhoto(info.uid).then((photo) => {
          const data = {
            ...res,
            photo,
          };
          setData(data);
        });
      });
    };
    const getLikesData = async () => {
      getUserByTheIds(info.id).then((res) => {
        getProfilePhoto(info.id).then((photo) => {
          const data = {
            ...res,
            photo,
          };
          setData(data);
        });
      });
    };
    identify === "Following" && getFollowingData();
    identify === "Followers" && getFollowersData();
    identify === "likes" && getLikesData(info);
  }, []);
  return (
    <Link to={data.nick === user ? `/profile` : `/profile/${data.nick}`}>
      <div className="relative flex items-center w-full h-24 gap-4 my-2 cursor-pointer group rounded-2xl">
        {data.banner ? (
          <img
            src={`${data.banner}`}
            alt={data.nick}
            className="absolute inset-0 object-cover w-full h-full transition-opacity duration-700 opacity-0 rounded-2xl group-hover:opacity-40"
          />
        ) : null}
        {data.photo ? (
          <img src={`${data.photo}`} alt={data.nick} className="z-10 object-cover w-16 h-full rounded-xl" />
        ) : (
          <div className="z-10 w-16 h-full rounded-xl bg-fuchsia-700"></div>
        )}
        <div className="flex gap-1">
          <p className="z-10 text-lg text-slate-200">{data.nick}</p>
        </div>
      </div>
    </Link>
  );
}

export default FollowerModalCard;
