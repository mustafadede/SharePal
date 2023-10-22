import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSelectedUserPosts } from "../../../firebase/firebaseActions";
import FeedCard from "../../common/FeedCard";
import LoginRestrictionComponent from "../../common/LoginRestrictionComponent";

function PostsSection({ username, uid }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      if (!username) {
        getSelectedUserPosts(localStorage.getItem("user")).then((res) => {
          setPosts(res);
        });
      } else {
        getSelectedUserPosts(uid).then((res) => {
          setPosts(res);
        });
      }
    }, 500);
  }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full overflow-y-scroll no-scrollbar">
      {!localStorage.getItem("user") ? <LoginRestrictionComponent /> : null}
      {username && posts.length === 0 && localStorage.getItem("user") && (
        <p className="w-full p-4 mt-1 text-xl text-center text-slate-400 bg-slate-900 rounded-2xl h-fit">
          This user doesn't have any post.
        </p>
      )}
      {!username && posts.length === 0 && (
        <p className="w-full p-4 mt-1 text-xl text-center text-slate-400 bg-slate-900 rounded-2xl h-fit">You don't have any post.</p>
      )}
      {posts
        .map((data, index) => {
          if (data.attachedFilm) {
            return <FeedCard key={index} isAttached={true} data={data} index={index} />;
          } else if (data.spoiler) {
            return <FeedCard key={index} isSpoiler={true} data={data} index={index} />;
          } else {
            return <FeedCard key={index} isComment={true} data={data} index={index} />;
          }
        })
        .reverse()}
    </motion.div>
  );
}

export default PostsSection;
