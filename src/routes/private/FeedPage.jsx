import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import ProfileCard from "../../components/common/ProfileCard";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import { getCurrentUserData, getAllPosts } from "../../firebase/firebaseActions";
import FeedActionBox from "../../components/layout/FeedActionBox";
import FeedCard from "../../components/common/FeedCard";
import MyListsCard from "../../components/common/MyListsCard/MyListsCard";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import { allPostsActions } from "../../store/allPostsSlice";

function FeedPage() {
  const { user } = useSelector((state) => state.user);
  const { allPosts } = useSelector((state) => state.allPosts);
  const { post } = useSelector((state) => state.createPost);
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "SharePal | Feed";
    const getData = async () => {
      try {
        const userData = await getCurrentUserData(localStorage.getItem("user"));
        userData && dispatch(userActions.updateUser(userData));
        // getAllPosts().then((data) => {
        //   dispatch(allPostsActions.updateAllPosts(data));
        // });
        // dispatch(allPostsActions.updateLength());
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSearch = () => {
    setSearch(!search);
  };
  const handleSearchFalse = () => {
    setSearch(false);
  };
  return (
    <>
      <Navbar
        handleSearchFalse={handleSearchFalse}
        handleSearch={handleSearch}
        isNotLoggedin={false}
        additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30"
      />
      <div className="flex mx-10">
        {!search && (
          <>
            <div className="hidden lg:w-1/4 h-fit lg:flex flex-col sticky top-[4.7rem] bg-cGradient2">
              {user ? <ProfileCard nick={user.nick} following={user.following} followers={user.followers} /> : <ProfileCard />}
              <MyListsCard />
            </div>
            <div className="flex flex-col w-full px-6">
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
            </div>
          </>
        )}
        {search && (
          <>
            <div className="hidden w-full h-fit lg:flex sticky top-[4.7rem] justify-center">
              <p className="w-[53.5rem] overflow-x-scroll">
                <h1 className="mb-4 text-3xl text-slate-200">Search</h1>
                <input
                  className="w-full py-2 text-2xl text-white transition-all bg-transparent border-b-2 outline-none focus-within:border-slate-900"
                  type="text"
                  placeholder="Search for a user or movie/series"
                />
              </p>
            </div>
          </>
        )}
        <div className="hidden w-1/3 h-fit lg:flex sticky top-[4.7rem] justify-center">
          <PopularCard />
        </div>
      </div>
    </>
  );
}

export default FeedPage;
