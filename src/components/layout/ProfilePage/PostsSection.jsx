import React, { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSelectedUserPosts, getSelectedUserPostsList } from "../../../firebase/firebaseActions";
import FeedCard from "../../common/FeedCard";
import LoginRestrictionComponent from "../../common/LoginRestrictionComponent";
import { useTranslation } from "react-i18next";

function PostsSection({ username, uid, accountPrivacyFlag }) {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setPosts([]);
      const userId = localStorage.getItem("user");

      if (!userId) return;

      if (!username) {
        getSelectedUserPostsList(userPostIds)
          .then((userPostIds) => {
            userPostIds.forEach((postId) => {
              getSelectedUserPosts(postId).then((userPosts) => {
                setPosts((prev) => (prev ? [...prev, userPosts] : [userPosts]));
              });
            });
          })
          .then((userPosts) => {
            setPosts(userPosts);
          });
      } else if (accountPrivacyFlag) {
        getSelectedUserPostsList(uid).then((userPostIds) => {
          userPostIds?.forEach((postId) => {
            getSelectedUserPosts(postId).then((userPosts) => {
              setPosts((prev) => (prev ? [...prev, userPosts] : [userPosts]));
            });
          });
        });
      }
    }, 500);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full overflow-y-scroll no-scrollbar">
        {!localStorage.getItem("user") ? <LoginRestrictionComponent /> : null}
        {username && posts?.length === 0 && localStorage.getItem("user") && (
          <p className="w-full p-4 mt-1 text-xl text-center text-slate-400 bg-slate-900 rounded-2xl h-fit">{t("posts.noPosts")}</p>
        )}
        {!username && posts?.length === 0 && (
          <p className="w-full p-4 mt-1 text-xl text-center text-slate-400 bg-slate-900 rounded-2xl h-fit">{t("posts.noMyPosts")}</p>
        )}
        {posts
          ?.map((data, index) => {
            if (data[0].attachedFilm) {
              return <FeedCard key={index} isAttached={true} data={data[0]} index={index} />;
            } else if (data[0].spoiler) {
              return <FeedCard key={index} isSpoiler={true} data={data[0]} index={index} />;
            } else if (!data[0].actionName && !data[0].attachedFilm && !data[0].spoiler) {
              return <FeedCard key={index} isComment={true} data={data[0]} index={index} />;
            }
          })
          .reverse()}
      </motion.div>
    </Suspense>
  );
}

export default PostsSection;
