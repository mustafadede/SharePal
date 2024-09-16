import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
function NavbarSearch() {
  const dispatch = useDispatch();

  return (
    <>
      <div className="block lg:hidden">
        <Link to={"/search"}>
          <motion.button className="flex items-center justify-center transition-all duration-150 rounded lg:border lg:hover:border-slate-200/60 lg:border-1 lg:border-slate-200/20 lg:bg-slate-900 lg:px-2 lg:py-4 lg:rounded-2xl group min-w-7 h-7">
            <span className="hidden lg:flex lg:px-2 text-fuchsia-600">Alt + K</span>
            <MagnifyingGlassIcon className="w-8 h-8 md:w-7 md:h-7 text-cWhite" />
          </motion.button>
        </Link>
      </div>
      <div className="hidden lg:block">
        <motion.button
          className="flex items-center justify-center transition-all duration-150 rounded lg:border lg:hover:border-slate-200/60 lg:border-1 lg:border-slate-200/20 lg:bg-slate-900 lg:px-2 lg:py-4 lg:rounded-2xl group min-w-7 h-7"
          onClick={() => dispatch(modalActions.openModal({ name: "searchModal" }))}
        >
          <span className="hidden lg:flex lg:px-2 text-fuchsia-600">Alt + K</span>
          <MagnifyingGlassIcon className="w-8 h-8 md:w-7 md:h-7 text-cWhite" />
        </motion.button>
      </div>
    </>
  );
}

export default NavbarSearch;
