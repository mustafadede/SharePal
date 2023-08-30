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
import FeedTabs from "../../components/layout/FeedPage/FeedTabs";
import { profileActions } from "../../store/profileSlice";
import { postsActions } from "../../store/postsSlice";
import { createPostActions } from "../../store/createPostSlice";

function FeedPage() {
  const { user } = useSelector((state) => state.user);
  const { posts, status } = useSelector((state) => state.posts);
  const { post, postsLength } = useSelector((state) => state.createPost);
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "SharePal | Feed";
    const getData = async () => {
      try {
        const userData = await getCurrentUserData(localStorage.getItem("user"));
        userData && dispatch(userActions.updateUser(userData));
        dispatch(postsActions.updateStatus("loading"));
        const response = await getAllPosts();
        dispatch(postsActions.updatePosts(response));
        dispatch(postsActions.updateStatus("done"));
      } catch (error) {
        console.log(error);
      }
    };
    dispatch(profileActions.removeUser(null));
    getData();
  }, [post]);

  return (
    <>
      <Navbar
        isNotLoggedin={false}
        additionalClasses="sticky top-0 bg-gradient-to-t from-cGradient2/70 to-cGradient2 backdrop-blur-[2px] z-30"
      />
      <div className="flex mx-10 ">
        <motion.div
          className="hidden lg:w-1/4 h-fit lg:flex flex-col sticky top-[4.6rem] bg-cGradient2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {user ? (
            <ProfileCard nick={user.nick} following={user.following} followers={user.followers} quote={user.quote} banner={user.banner} />
          ) : (
            <ProfileCard />
          )}
          <MyPinnedListsCard />
        </motion.div>
        <motion.div className="flex flex-col w-full xl:px-6">
          <FeedTabs tabInfo={tab} tab={setTab} />
          <FeedActionBox />
          {tab === 0 && status === "loading" && <p className="w-full mt-1 text-xl text-center text-slate-400">Loading...</p>}
          {tab === 0 &&
            status === "done" &&
            posts
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

          {tab === 1 && <p className="w-full mt-1 text-xl text-center text-slate-400">You don't follow anything yet...</p>}
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
