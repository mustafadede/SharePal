import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDownIcon, HeartIcon, PersonIcon } from "@radix-ui/react-icons";
import { getSelectedUserPost } from "../../../firebase/firebaseActions";
import FeedCard from "../FeedCard/";

function NotificationLikeCard({ nick, photoURL, date, postId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState(null);
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const hour = new Date(date).getHours();
  const minute = new Date(date).getMinutes();
  const newDate = `${day}/${month}/${year} ${hour}:${minute < 10 ? "0" + minute : minute}`;

  useEffect(() => {
    getSelectedUserPost(localStorage.getItem("user"), postId).then((res) => setPost(res));
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between w-full p-4 mb-4 transition-all duration-150 border border-transparent bg-slate-900 rounded-xl hover:border-slate-400">
        <div className="flex gap-4">
          {photoURL && (
            <motion.img className="object-cover w-12 h-12 rounded-full lg:w-16 lg:h-16 bg-fuchsia-600" src={photoURL}></motion.img>
          )}
          <motion.div className="flex flex-col items-start justify-center">
            <motion.p className="flex gap-1 text-base text-cWhite text-slate-20">
              <Link
                to={`/profile/${nick}`}
                className="text-base transition-all duration-300 text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600"
              >
                <motion.span className="font-bold text-fuchsia-600 ">{nick}</motion.span>
              </Link>
              liked your post.
            </motion.p>

            <motion.p className="text-sm text-slate-400">{newDate}</motion.p>
          </motion.div>
        </div>
        <div className="flex gap-4 items-center">
          <HeartIcon className="w-6 h-6 text-slate-200" />
          <button
            className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-800 hover:bg-fuchsia-700 transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronDownIcon className="w-6 h-6 text-slate-200" />
          </button>
        </div>
      </div>
      {isOpen &&
        post &&
        post.map((data, index) => {
          if (data.attachedFilm) {
            return <FeedCard key={index} isAttached={true} data={data} index={index} />;
          } else if (data.spoiler) {
            return <FeedCard key={index} isSpoiler={true} data={data} index={index} />;
          } else {
            return <FeedCard key={index} isComment={true} data={data} index={index} />;
          }
        })}
    </div>
  );
}

export default NotificationLikeCard;
