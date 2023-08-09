import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import ProfileCard from "../../components/common/ProfileCard";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import { getCurrentUserData, getAllPosts } from "../../firebase/firebaseActions";
import FeedActionBox from "../../components/layout/FeedActionBox";
import FeedCard from "../../components/common/FeedCard";
import MyPinnedListsCard from "../../components/common/MyPinnedListsCard/MyPinnedListsCard";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import { motion } from "framer-motion";

function FeedPage() {
  const { user } = useSelector((state) => state.user);
  const { post } = useSelector((state) => state.createPost);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "SharePal | Feed";
    const getData = async () => {
      try {
        const userData = await getCurrentUserData(localStorage.getItem("user"));
        userData && dispatch(userActions.updateUser(userData));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex mx-10">
        <motion.div
          className="hidden lg:w-1/4 h-fit lg:flex flex-col sticky top-[4.7rem] bg-cGradient2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {user ? <ProfileCard nick={user.nick} following={user.following} followers={user.followers} /> : <ProfileCard />}
          <MyPinnedListsCard />
        </motion.div>
        <motion.div className="flex flex-col w-full px-6">
          <FeedActionBox />
          {post.map((data, i) => {
            if (data.attachedFilm && !data.attachedPhoto) {
              return <FeedCard isAttached={true} data={data} />;
            } else if (data.attachedPhoto && !data.attachedFilm) {
              return <FeedCard isUpload={true} data={data} />;
            } else {
              return <FeedCard isComment={true} data={data} />;
            }
          })}
        </motion.div>
        <motion.div
          className="hidden w-1/3 h-fit lg:flex sticky top-[4.7rem] justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PopularCard />
        </motion.div>
      </div>
    </>
  );
}

export default FeedPage;
