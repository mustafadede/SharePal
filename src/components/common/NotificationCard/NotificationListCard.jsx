import { ListBulletIcon } from "@radix-ui/react-icons";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function NotificationListCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-row items-center justify-between w-full p-4 mb-4 transition-all duration-150 border border-transparent h-fit bg-slate-900 rounded-xl hover:border-slate-400"
    >
      <div className="flex gap-4">
        <motion.img
          className="object-cover w-12 h-12 rounded-full lg:w-16 lg:h-16 bg-fuchsia-600"
          src="https://firebasestorage.googleapis.com/v0/b/sharepal-5d528.appspot.com/o/profilePhotos%2F1GnQrkyHUySMZsMuui0ygmkkBId2?alt=media&token=8d9d56e0-e3e9-47f4-a764-7be0f26d67fe"
        ></motion.img>
        <motion.div className="flex flex-col items-start justify-center text-cWhite">
          <motion.p className="flex gap-1 text-base text-slate-20">
            <Link
              to="/profile/rasit"
              className="text-base transition-all duration-300 text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600"
            >
              <motion.span className="font-bold text-fuchsia-600 ">Rasit</motion.span>
            </Link>
            create a new
            <Link to="/profile/rasit" className="text-base transition-all duration-300 text-slate-200 hover:cursor-pointer w-fit ">
              <motion.span className="font-bold text-fuchsia-600 hover:text-slate-300">list</motion.span>
            </Link>
            for you
          </motion.p>
          <motion.p className="text-sm text-slate-400">2 days ago</motion.p>
        </motion.div>
      </div>
      <ListBulletIcon className="w-6 h-6 text-slate-200" />
    </motion.div>
  );
}

export default NotificationListCard;
