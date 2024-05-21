import React, { useEffect } from "react";
import { motion } from "framer-motion";
import FeedCardPageCommentCard from "../../common/FeedCardPageCommentCard";
import { useDispatch, useSelector } from "react-redux";
import InfoLabel from "../../common/InfoLabel";
import { getAllPosts, getCommentsList, getProfilePhoto, getUserByTheIds } from "../../../firebase/firebaseActions";
import { postsActions } from "../../../store/postsSlice";
import { cardActions } from "../../../store/cardSlice";
import { useLocation } from "react-router-dom";
import LoginRestrictionComponent from "../../common/LoginRestrictionComponent";
import { useTranslation } from "react-i18next";

function FeedCardPageCommentComponent() {
  const { cardComments, commentsState } = useSelector((state) => state.card);
  const { state: incomingData } = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    const getData = async () => {
      const response = await getAllPosts();
      dispatch(postsActions.updatePosts(response));
      dispatch(cardActions.updateCommentsState("loading"));
      getCommentsList(incomingData?.pId).then((res) => {
        if (res.length === 0) {
          return dispatch(cardActions.updateCommentsState("noComments"));
        }
        res
          .sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })
          .map((user) => {
            getUserByTheIds(user.userId).then((res) => {
              getProfilePhoto(user.userId).then((photo) => {
                const data = {
                  ...user,
                  ...res,
                  photo,
                };
                dispatch(cardActions.initilizeComments(data));
              });
            });
          });
        dispatch(cardActions.updateCommentsState("done"));
      });
    };
    localStorage.getItem("user") ? getData() : dispatch(cardActions.updateCommentsState("login"));
  }, []);

  return (
    <motion.div
      className="flex flex-col w-full h-fit rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.h1
        className="mb-2 text-xl text-slate-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {t("comments.comments")}
      </motion.h1>
      {commentsState === "noComments" && <InfoLabel text={t("comments.notFound")} />}
      {commentsState === "loading" && <InfoLabel text={t("info.loading")} />}
      {commentsState === "done" &&
        cardComments.length > 0 &&
        cardComments.map((user, index) => (
          <FeedCardPageCommentCard
            key={index}
            commentKey={user.commentKey}
            commentId={user.commentId}
            nick={user.nick}
            photo={user.photo}
            comment={user.comment}
            date={user.date}
            likes={user.likes}
            likesList={user.likesList}
            comments={user.comments}
            dataEdited={user.isEdited}
            relatedPostId={incomingData.pId}
            relatedUserId={incomingData.uId}
            userId={user.userId}
          />
        ))}
      {commentsState === "done" && cardComments.length === 0 && <InfoLabel text={t("comments.notFound")} />}
      {commentsState === "login" && <LoginRestrictionComponent />}
    </motion.div>
  );
}

export default FeedCardPageCommentComponent;
