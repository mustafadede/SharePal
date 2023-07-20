import React from "react";
import Navbar from "../../components/layout/Navbar";
import { getAuth } from "firebase/auth";
import ProfileCard from "../../components/common/ProfileCard";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
function FeedPage() {
  const user = getAuth().currentUser;
  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 bg-cGradient2 z-30" />
      <div className="mx-10 flex">
        <div className="hidden lg:w-1/4 h-fit lg:flex sticky top-[4.7rem] bg-cGradient2">
          <ProfileCard user={user} />
        </div>
        <div className=" w-full lg:w-3/3 h-[200vh]"></div>
        <div className="hidden w-full md:w-1/2 lg:w-1/3 h-fit lg:flex sticky top-[4.7rem] justify-center">
          <PopularCard />
        </div>
      </div>
    </>
  );
}

export default FeedPage;
