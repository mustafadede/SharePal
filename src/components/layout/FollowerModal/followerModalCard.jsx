import React, { useEffect } from "react";
import { getProfilePhoto, getUserByTheIds } from "../../../firebase/firebaseActions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useSearchWithMovieId from "../../../hooks/useSearchWithMovieId";
import useSearchWithSeriesId from "../../../hooks/useSearchWithSeriesId";
import ListModalCard from "../MyListModal/ListModal/ListModalCard";

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

    const getTotalFilms = async () => {
      useSearchWithMovieId(info.id).then((res) => {
        setData(res);
      });
    };

    const getTotalSeries = async () => {
      useSearchWithSeriesId(info.id).then((res) => {
        setData(res);
      });
    };
    identify === "Following" && getFollowingData();
    identify === "Followers" && getFollowersData();
    identify === "Likes" && getLikesData(info);
    identify === "Total Films" && getTotalFilms(info);
    identify === "Total Series" && getTotalSeries(info);
  }, []);
  return identify === "Total Films" || identify === "Total Series" ? (
    <ListModalCard
      id={data.id || data.uid}
      title={data.title || data.name}
      poster={data.poster_path || data.profile_path}
      releaseDate={data.release_date || data.first_air_date}
      backdrop={data.backdrop_path}
      username={user}
    />
  ) : (
    <Link to={data.nick === user ? `/profile` : `/user/${data.nick}`}>
      <div className="relative flex items-center w-full h-24 gap-4 my-2 cursor-pointer group rounded-2xl">
        {data.banner ? (
          <img
            src={`${data.banner}`}
            alt={data.nick}
            className="absolute inset-0 object-cover w-full h-full transition-opacity duration-700 opacity-0 rounded-2xl group-hover:opacity-40"
            loading="lazy"
          />
        ) : null}
        {data.photo ? (
          <img src={`${data.photo}`} alt={data.nick} className="z-10 object-cover w-16 h-full rounded-xl" loading="lazy" />
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
