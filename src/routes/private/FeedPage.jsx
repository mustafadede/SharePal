import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProfileCard from "../../components/common/ProfileCard";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import { getCurrentUserData } from "../../firebase/firebaseActions";
import FeedActionBox from "../../components/layout/FeedActionBox";
import FeedCard from "../../components/common/FeedCard";
import MyListsCard from "../../components/common/MyListsCard/MyListsCard";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { auth } from "../../firebase/firebaseConfig";
function FeedPage() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrentUserData(getAuth().currentUser.uid);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [localStorage.getItem("user")]);
  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-gradient-to-t from-transparent to-cGradient2 z-30" />
      <div className="flex mx-10">
        <div className="hidden lg:w-1/4 h-fit lg:flex flex-col sticky top-[4.7rem] bg-cGradient2">
          {user ? <ProfileCard nick={user.nick} following={user.following} followers={user.followers} /> : <p>Yükleniyor...</p>}
          <MyListsCard />
        </div>
        <div className="flex flex-col w-full px-6">
          <FeedActionBox />
          <div className="">
            <FeedCard isComment={true} />
            <FeedCard isAttached={true} />
            <FeedCard isUpload={true} />
          </div>
        </div>
        <div className="hidden w-full md:w-1/2 lg:w-1/3 h-fit lg:flex sticky top-[4.7rem] justify-center">
          <PopularCard />
        </div>
      </div>
    </>
  );
}

export default FeedPage;
