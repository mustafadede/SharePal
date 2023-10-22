import React from "react";
import { useNavigate } from "react-router-dom";

function LoginRestrictionComponent() {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/login");
  };
  return (
    <button className="w-full p-4 mt-1 text-xl text-center hover:underline text-slate-400 bg-slate-900 rounded-2xl" onClick={clickHandler}>
      You have to login to see this area.
    </button>
  );
}

export default LoginRestrictionComponent;
