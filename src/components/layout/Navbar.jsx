import React, { useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import { Link } from "react-router-dom";
import SecondaryButton from "../common/SecondaryButton";
import { ExitIcon, GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const dropdownItems = [
  {
    key: 1,
    title: "Profile",
    icon: <PersonIcon className="w-6 h-6" />,
    whereTo: "/profile",
  },
  {
    key: 2,
    title: "Settings",
    icon: <GearIcon className="w-6 h-6" />,
    whereTo: "/settings",
  },
];

function Navbar({ isNotLoggedin = true, additionalClasses = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className={`flex flex-wrap items-center justify-between py-4 mx-10 ${additionalClasses}`}>
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
          <>
            <div className="relative">
              <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center w-7 h-7 rounded">
                <GearIcon className="w-10 h-10 md:w-6 md:h-6 text-cWhite hover:text-fuchsia-700 hover:transition-colors" />
              </button>
              <div
                className={`absolute right-0 z-10 w-32 mt-2 origin-top-right bg-slate-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {dropdownItems.map((item) => (
                    <Link to={item.whereTo}>
                      <button
                        key={item.key}
                        className="flex w-full h-full gap-4 px-4 py-2 text-sm text-cWhite hover:text-fuchsia-700 hover:transition-colors"
                        role="menuitem"
                      >
                        {item.icon}
                        {item.title}
                      </button>
                    </Link>
                  ))}

                  <button
                    onClick={() =>
                      signOut(auth)
                        .then(() => {
                          return navigate("/login");
                        })
                        .catch((error) => {
                          return toast("Bir hata oluştu!", error.code);
                        })
                    }
                    className="flex w-full h-full gap-4 px-4 py-2 text-sm text-cWhite hover:text-fuchsia-700 hover:transition-colors"
                    role="menuitem"
                  >
                    <ExitIcon className="w-6 h-6" />
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
