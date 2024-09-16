import React from "react";
import { motion } from "framer-motion";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";

function Footer() {
  return (
    <motion.div className="flex flex-col-reverse items-center justify-between w-full p-4 md:flex-row h-fit rounded-tl-xl rounded-tr-xl text-slate-200">
      <div className="flex flex-col flex-shrink-0 md:mr-6 bg-gradient-to-r from-cDarkerPurple to-pink-500 bg-clip-text animate-text">
        <div className="flex items-center gap-4 md:items-start md:flex-col md:gap-1">
          <span className="text-4xl font-bold tracking-tight text-transparent select-none">SharePal</span>
          <p className="text-sm text-center md:text-start text-slate-600">© 2023 SharePal</p>
        </div>
      </div>
      <div>
        <div className="flex flex-row gap-2">
          <a
            href="https://instagram.com/sharepal.dev"
            target="_blank"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md w-fit h-fit bg-slate-800"
          >
            <InstagramLogoIcon className="inline-block w-6 h-6" />
            <p className="flex items-center justify-center text-xs">Instagram</p>
          </a>
          <a
            href="https://github.com/mustafadede/SharePal"
            target="_blank"
            className="items-center justify-center hidden gap-2 px-4 py-2 rounded-md md:flex w-fit h-fit bg-slate-800"
          >
            <GitHubLogoIcon className="inline-block w-6 h-6" />
            <p className="flex items-center justify-center text-xs">GitHub</p>
          </a>
          <a href="#" className="flex items-center justify-center w-full gap-2 px-4 py-2 rounded-md h-fit bg-slate-800">
            <img src="../../../../public/images/google.png" alt="Google Play" className="w-6 h-6" />
            <p className="flex items-center justify-center text-xs">Coming Soon</p>
          </a>
        </div>
        <p className="mt-2 mb-2 text-xs text-center md:mb-0 md:text-end text-slate-600">
          All designs and coding are made by
          <a href="https://github.com/mustafadede" target="_blank" className="ml-1 underline">
            Mustafa Dede
          </a>
        </p>
      </div>
    </motion.div>
  );
}

export default Footer;
