import React, { useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import { Link } from "react-router-dom";
import SecondaryButton from "../common/SecondaryButton";
import { signOutAction } from "../../firebase/firebaseActions";
function Navbar({ isNotLoggedin = true }) {
  return (
    <nav className="flex flex-wrap items-center justify-between py-4 mx-10">
      <div className="flex items-center flex-shrink-0 md:mr-6 bg-gradient-to-r from-cDarkerPurple to-pink-500 bg-clip-text animate-text">
        <Link to={"/"}>
          <span className="text-4xl font-bold tracking-tight text-transparent cursor-pointer select-none">SharePal</span>
        </Link>
      </div>
      <div className="flex gap-2 md:gap-4">
        {isNotLoggedin ? (
          <>
            <SecondaryButton title="Sign Up" whereTo={"/signup"} />
            <PrimaryButton title="Log In" whereTo={"/login"} />
          </>
        ) : (
          <SecondaryButton
            title="Log Out"
            whereTo={"/"}
            onClickHandler={() => {
              signOutAction;
            }}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
