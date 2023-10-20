import React from "react";
import { errorPageGifs } from "../assets/errorPageGifs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function NotFound() {
  const user = localStorage.getItem("user");
  console.log(errorPageGifs);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <img
        src={errorPageGifs[Math.floor(Math.random() * errorPageGifs.length)].url}
        alt="404"
        className="object-cover w-1/2 h-96 rounded-2xl"
        loading="lazy"
      />
      <div className="flex flex-col items-center justify-center w-1/2 gap-4">
        <h1 className="text-3xl text-slate-400">Ups... Are you lost ?</h1>
        <Link
          to={user ? "/feed" : "/"}
          className="px-6 py-2 text-lg transition-colors duration-300 rounded-lg select-none w-fit h-100 bg-fuchsia-800 hover:bg-slate-900 text-cWhite"
        >
          Go to SharePal
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
