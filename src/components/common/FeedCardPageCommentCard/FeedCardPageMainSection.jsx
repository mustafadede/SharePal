import React, { useEffect, useState } from "react";
import FeedCardActionsSkeleton from "../FeedCard/FeedCardActions/FeedCardActionsSkeleton";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import {
  createNotification,
  createSelectedUserPostLikeLists,
  removeSelectedUserPostLikeLists,
  updateSelectedCommentLikes,
} from "../../../firebase/firebaseActions";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { cardActions } from "../../../store/cardSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function FeedCardPageMainSection({
  commentKey,
  commentId,
  comment,
  likes,
  likesList,
  notification,
  rename,
  editedText,
  setEditedText,
  handlePost,
  relatedPostId,
  relatedUserId,
  data,
  userId,
}) {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);
  const { cardComments } = useSelector((state) => state.card);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedComment = cardComments.filter((comment) => comment.commentId === commentId) || data;
  const likeHandler = () => {
    setLiked(!liked);
    if (!liked) {
      dispatch(
        cardActions.updateLikes({
          commentId: commentId,
          likes: likes + 1,
          likesList: likesList
            ? [...likesList, { id: getAuth().currentUser.uid, nick: user.nick }]
            : [{ id: getAuth().currentUser.uid, nick: user.nick }],
        })
      );
      updateSelectedCommentLikes(relatedPostId, commentId, {
        likes: likes + 1,
        likesList: likesList
          ? [...likesList, { id: getAuth().currentUser.uid, nick: user.nick }]
          : [{ id: getAuth().currentUser.uid, nick: user.nick }],
      })
        .then(() => {
          createSelectedUserPostLikeLists([
            {
              id: userId,
              date: new Date().toISOString(),
              postId: commentKey,
              relatedPostId: relatedPostId,
              userId: relatedUserId,
              commentId: commentId,
              isComment: true,
            },
          ]);
        })
        .then(() => {
          if (getAuth().currentUser.uid !== userId) {
            createNotification(userId, {
              from: {
                uid: getAuth().currentUser.uid,
                nick: user.nick,
                photo: getAuth().currentUser.photoURL,
                postId: relatedPostId,
              },
              date: new Date().toISOString(),
              type: "commentLike",
            });
          }
        });
    } else {
      dispatch(
        cardActions.updateLikes({
          commentId: commentId,
          likes: likes - 1,
          likesList: likesList.filter((like) => like.id !== getAuth().currentUser.uid),
        })
      );
      updateSelectedCommentLikes(relatedPostId, commentId, {
        likes: likes - 1,
        likesList: likesList.filter((like) => like.id !== getAuth().currentUser.uid),
      }).then(() => {
        removeSelectedUserPostLikeLists(commentKey);
      });
    }
  };

  useEffect(() => {
    const checkIfLiked = () => {
      likesList?.find((like) => like.id === getAuth().currentUser.uid) && setLiked(true);
    };
    checkIfLiked();
  }, []);

  const goToPostHandler = () => {
    navigate(`/feed/${data[1]?.nick}/${data[0].relatedPostId}`, { state: { uId: data[0]?.relatedUserId, pId: data[0].relatedPostId } });
  };

  return (
    <>
      {!rename ? (
        <div className="flex justify-between">
          <p className="py-1 text-slate-200">{comment}</p>
          {!notification && (
            <div className="flex items-center ">
              <button onClick={likeHandler}>
                {liked ? <HeartFilledIcon className="w-6 h-5 text-fuchsia-600" /> : <HeartIcon className="w-6 h-5 text-slate-400" />}
              </button>
            </div>
          )}
        </div>
      ) : (
        <input
          type="text"
          placeholder={t("feedCardPageMainSection.placeholder")}
          className="w-full px-4 py-2 my-4 transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
          value={editedText !== undefined ? editedText : comment}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={(e) => handlePost(e)}
        />
      )}
      {!notification && (
        <div className="flex gap-2">
          <FeedCardActionsSkeleton action={t("feedPost.likes")} number={likes} data={selectedComment[0]} />
        </div>
      )}
      {notification && (
        <div className="flex gap-2">
          <button onClick={goToPostHandler} className="flex gap-2">
            <p className="text-fuchsia-400">{t("notification.button")}</p>
          </button>
        </div>
      )}
    </>
  );
}

export default FeedCardPageMainSection;
