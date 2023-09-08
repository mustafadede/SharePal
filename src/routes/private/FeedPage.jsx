import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import ProfileCard from "../../components/common/ProfileCard";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import { getAllPosts, getSelectedUserLists, getSelectedUserPosts } from "../../firebase/firebaseActions";
import FeedActionBox from "../../components/layout/FeedActionBox";
import FeedCard from "../../components/common/FeedCard";
import MyPinnedListsCard from "../../components/common/MyPinnedListsCard/MyPinnedListsCard";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import FeedTabs from "../../components/layout/FeedPage/FeedTabs";
import { profileActions } from "../../store/profileSlice";
import { postsActions } from "../../store/postsSlice";
import { MyListsActions } from "../../store/myListsSlice";

function FeedPage() {
  const { posts, status } = useSelector((state) => state.posts);
  const { post } = useSelector((state) => state.createPost);
  const { user } = useSelector((state) => state.user);
  const { followingList } = useSelector((state) => state.following);
  const [tab, setTab] = useState(0);
  const [notification, setNotification] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "SharePal | Feed";
    const getData = async () => {
      try {
        if (tab === 0) {
          dispatch(postsActions.updateStatus("loading"));
          const response = await getAllPosts();
          dispatch(postsActions.updatePosts(response));
          dispatch(postsActions.updateStatus("done"));
        } else {
          dispatch(postsActions.updateStatus("loading"));
          followingList.map(async (user) => {
            console.log(user.uid);
            const response = await getSelectedUserPosts(user.uid);
            dispatch(postsActions.updatePosts(response));
          });
          dispatch(postsActions.updateStatus("done"));
        }
      } catch (error) {
        console.log(error);
      }
    };
    dispatch(profileActions.removeUser(null));
    getData();
  }, [tab, post]);

  const getUserLists = async () => {
    const res = await getSelectedUserLists(localStorage.getItem("user"));
    dispatch(MyListsActions.setMyCoppiedList(res));
  };
  getUserLists();
  return (
    <>
      <Navbar
        isNotLoggedin={false}
        additionalClasses="sticky top-0 bg-gradient-to-t from-cGradient2/70 to-cGradient2 backdrop-blur-[2px] z-30"
        onClickHandler={() => setNotification(!notification)}
      />
      <div className="flex mx-10 ">
        <motion.div
          className="hidden lg:w-1/4 h-fit lg:flex flex-col sticky top-[4.6rem] bg-cGradient2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ProfileCard
            nick={user?.nick}
            following={user?.following}
            followers={user?.followers}
            quote={user?.quote}
            banner={user?.banner}
          />
          <MyPinnedListsCard />
        </motion.div>
        <motion.div className="flex flex-col w-full xl:px-6">
          <FeedTabs tabInfo={tab} tab={setTab} />
          <FeedActionBox />
          {notification && (
            <div className="w-full h-screen">
              <p className="w-full mt-1 text-xl text-center text-slate-400">You don't have any notification yet...</p>
            </div>
          )}
          {!notification && (
            <>
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
            </>
          )}
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
