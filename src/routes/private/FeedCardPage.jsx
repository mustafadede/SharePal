import React, { useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import ProfileCard from "../../components/common/ProfileCard";
import MyPinnedListsCard from "../../components/common/MyPinnedListsCard/MyPinnedListsCard";
import PopularCard from "../../components/common/MostPopularCard/PopularCard";
import { notificationActions } from "../../store/notificationSlice";
import { MyListsActions } from "../../store/myListsSlice";
import { userActions } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, getNotifications, getSelectedUserLists, getSpecificPost } from "../../firebase/firebaseActions";
import FeedCardPageCardComponent from "../../components/layout/FeedCardPage/FeedCardPageCardComponent";
import FeedCardPageBackButton from "../../components/layout/FeedCardPage/FeedCardPageBackButton";
import FeedCardPageCommentComponent from "../../components/layout/FeedCardPage/FeedCardPageCommentComponent";
import { motion } from "framer-motion";
import FeedCardPageCommentSection from "../../components/layout/FeedCardPage/FeedCardPageCommentSection";
import { useLocation } from "react-router-dom";
import { cardActions } from "../../store/cardSlice";

function FeedCardPage() {
  const { user } = useSelector((state) => state.user);
  const { cardData } = useSelector((state) => state.card);
  const dispatch = useDispatch();
  const { state: incomingData } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const getData = async () => {
      cardData.length === 0 && dispatch(cardActions.updateState("loading"));
      const userData = await getCurrentUserData(localStorage.getItem("user"));
      userData && dispatch(userActions.updateUser(userData));
      const notifications = await getNotifications(localStorage.getItem("user"));
      notifications && dispatch(notificationActions.setNotification(notifications)) && dispatch(notificationActions.updateStatus("done"));
      const res = await getSelectedUserLists(localStorage.getItem("user"));
      dispatch(MyListsActions.initilizeList(res));
      getSpecificPost(incomingData?.uId.trim(""), incomingData?.pId).then((res) => {
        dispatch(cardActions.updateState("done"));
        dispatch(cardActions.updateData(res));
      });
    };
    getData();
  }, []);

  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 z-30" />
      <div className="flex pb-4 mx-5 lg:gap-4 xl:gap-0 md:mx-10">
        <motion.div
          className="hidden lg:w-1/4 h-fit lg:flex flex-col sticky top-[4.6rem] bg-cGradient2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {user ? (
            <ProfileCard
              nick={user?.nick}
              following={user?.following}
              followers={user?.followers}
              quote={user?.quote}
              banner={user?.banner}
            />
          ) : (
            <ProfileCard />
          )}
          <MyPinnedListsCard isCard={true} />
        </motion.div>
        <div className="flex flex-col w-full xl:px-6">
          <FeedCardPageBackButton />
          <FeedCardPageCardComponent cardData={cardData} />
          <FeedCardPageCommentSection cardPost={cardData} />
          <FeedCardPageCommentComponent />
        </div>
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

export default FeedCardPage;
