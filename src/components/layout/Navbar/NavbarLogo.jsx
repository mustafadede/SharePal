import React from "react";
import { useNavigate } from "react-router-dom";

function NavbarLogo() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (localStorage.getItem("user") === null) {
      navigate("/");
    } else {
      navigate("/feed", { preventScrollReset: true });
    }
  };

  return (
    <div className="flex items-center flex-shrink-0 md:mr-6 bg-gradient-to-r from-cDarkerPurple to-pink-500 bg-clip-text animate-text">
      <button onClick={handleNavigation}>
        <span className="text-4xl font-bold tracking-tight text-transparent cursor-pointer select-none">SharePal</span>
      </button>
    </div>
  );
}

export default NavbarLogo;
