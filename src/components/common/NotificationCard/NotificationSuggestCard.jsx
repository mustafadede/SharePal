import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MagicWandIcon } from "@radix-ui/react-icons";

function NotificationSuggestCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-row items-center justify-between w-full p-4 mb-4 transition-all duration-150 border border-transparent bg-slate-900 rounded-xl hover:border-slate-400"
    >
      <div className="flex gap-4">
        <motion.img
          className="object-cover w-12 h-12 rounded-full lg:w-16 lg:h-16 bg-fuchsia-600"
          src="https://firebasestorage.googleapis.com/v0/b/sharepal-5d528.appspot.com/o/profilePhotos%2F1GnQrkyHUySMZsMuui0ygmkkBId2?alt=media&token=8d9d56e0-e3e9-47f4-a764-7be0f26d67fe"
          loading="lazy"
        ></motion.img>
        <motion.div className="flex flex-col items-start justify-center">
          <motion.p className="flex gap-1 text-base text-cWhite text-slate-20">
            <Link
              to="/profile/rasit"
              className="text-base transition-all duration-300 text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600"
            >
              <motion.span className="font-bold text-fuchsia-600 ">Rasit</motion.span>
            </Link>
            suggest a film for you
            <Link
              to="/profile/rasit"
              className="text-base transition-all duration-300 text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600"
            ></Link>
          </motion.p>
          <motion.button className="my-2 text-base font-bold transition-all duration-150 text-fuchsia-600 hover:text-slate-300">
            Mission: Impossible - Dead Reckoning Part One
          </motion.button>
          <motion.p className="text-sm text-slate-400">2 days ago</motion.p>
        </motion.div>
      </div>
      <MagicWandIcon className="w-6 h-6 text-slate-200" />
    </motion.div>
  );
}

export default NotificationSuggestCard;
