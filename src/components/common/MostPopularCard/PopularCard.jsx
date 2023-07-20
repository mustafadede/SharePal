import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PopularItem from "./PopularItem";
function PopularCard({ padding }) {
  const [data, setData] = useState([]);
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
    <div className="w-80 h-fit bg-slate-900 rounded-2xl p-6 flex flex-col">
      <p className="text-2xl text-slate-200">Popular</p>
      {data.map((value, index) => {
        return <PopularItem key={index} data={value} />;
      })}
      <p className="text-fuchsia-600 transition-colors hover:text-slate-300 text-lg pt-4">
        <NavLink to={"/home"}>Show more</NavLink>
      </p>
    </div>
  );
}

export default PopularCard;
