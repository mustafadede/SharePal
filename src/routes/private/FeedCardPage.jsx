import React, { useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificPost } from "../../firebase/firebaseActions";
import FeedCardPageCardComponent from "../../components/layout/FeedCardPage/FeedCardPageCardComponent";
import FeedCardPageBackButton from "../../components/layout/FeedCardPage/FeedCardPageBackButton";
import FeedCardPageCommentComponent from "../../components/layout/FeedCardPage/FeedCardPageCommentComponent";
import FeedCardPageCommentSection from "../../components/layout/FeedCardPage/FeedCardPageCommentSection";
import { useLocation } from "react-router-dom";
import { cardActions } from "../../store/cardSlice";
import { modalActions } from "../../store/modalSlice";
import PopularSection from "../../components/layout/PopularSection";
import ProfileWithListSection from "../../components/layout/ProfileWithListSection";

function FeedCardPage() {
  const { cardData } = useSelector((state) => state.card);
  const dispatch = useDispatch();
  const { state: incomingData } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(modalActions.closeModal());
    const getData = async () => {
      cardData.length === 0 && dispatch(cardActions.updateState("loading"));
      if (incomingData) {
        getSpecificPost(incomingData?.uId.trim(""), incomingData?.pId).then((res) => {
          dispatch(cardActions.updateState("done"));
          dispatch(cardActions.updateData(res));
        });
      } else {
        getSpecificPost(localStorage.getItem("shareUId"), localStorage.getItem("sharePId")).then((res) => {
          dispatch(cardActions.updateState("done"));
          dispatch(cardActions.updateData(res));
        });
      }
    };
    getData();
  }, []);

  return (
    <>
      <Navbar isNotLoggedin={false} additionalClasses="sticky top-0 z-30" />
      <div className="flex pb-4 mx-5 lg:gap-4 xl:gap-0 md:mx-10">
        <ProfileWithListSection />
        <div className="flex flex-col w-full xl:px-6">
          <FeedCardPageBackButton />
          <FeedCardPageCardComponent cardData={cardData} />
          <FeedCardPageCommentSection cardPost={cardData} />
          <FeedCardPageCommentComponent />
        </div>
        <PopularSection />
      </div>
    </>
  );
}

export default FeedCardPage;
