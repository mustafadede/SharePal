import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSelectedUserPosts } from "../../../firebase/firebaseActions";
import FeedCard from "../../common/FeedCard";

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
      {posts.length === 0 && <p className="text-2xl text-slate-400">You don't have any post.</p>}
      {posts
        .map((data, index) => {
          if (data.attachedFilm) {
            return <FeedCard key={index} isAttached={true} data={data} index={index} />;
          } else if (data.attachedPhoto) {
            return <FeedCard key={index} isUpload={true} data={data} index={index} />;
          } else {
            return <FeedCard key={index} isComment={true} data={data} index={index} />;
          }
        })
        .reverse()}
    </motion.div>
  );
}

export default PostsSection;
