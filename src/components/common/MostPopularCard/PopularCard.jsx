import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PopularItem from "./PopularItem";
import { useDispatch } from "react-redux";
function PopularCard() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/trending/all/day`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
        },
      });
      const data = await response.json();
      const populerDatas = data.results.slice(0, 4);
      setData(populerDatas);
    };
    fetchMovie();
  }, []);

  return (
    <div className="flex flex-col p-6 lg:w-56 xl:w-72 h-fit bg-slate-900 rounded-2xl">
      <p className="text-2xl text-slate-200">Popular</p>
      {data.map((value, index) => {
        return <PopularItem key={index} data={value} dispatch={dispatch} />;
      })}
      <p className="pt-4 text-lg transition-colors text-fuchsia-400 hover:text-slate-300">
        <NavLink to={"/explore"}>Show more</NavLink>
      </p>
    </div>
  );
}

export default PopularCard;
