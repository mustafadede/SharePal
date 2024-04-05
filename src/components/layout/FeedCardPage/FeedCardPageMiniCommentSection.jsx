import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCommentsList, createNotification, createUserCommentsList, updateSelectedPost } from "../../../firebase/firebaseActions";
import { cardActions } from "../../../store/cardSlice";
import { motion } from "framer-motion";
import { postsActions } from "../../../store/postsSlice";

function FeedCardPageMiniCommentSection({ postId, userId, comments, setCommentVisible, pointer = false }) {
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handlePostComment = () => {
    const commentId = Date.now() + user.uid; // This is a temporary solution, it will be changed in the future
    if (comment.length === 0) return toast.error("Comment can't be empty");
    createCommentsList(postId, {
      commentId: commentId,
      userId: user.uid,
      comment: comment,
      relatedPostId: postId,
      relatedUserId: userId,
    }).then(() => {
      updateSelectedPost(userId.trim(""), postId, { comments: comments + 1 });
      dispatch(postsActions.updateSelectedCommentNumber({ postId: postId, comments: comments + 1 }));
      if (user.uid !== userId) {
        createNotification(userId, {
          type: "comment",
          from: { uid: user.uid, nick: user.nick, photo: user.photoURL, postId: postId, comment: comment },
          date: Date.now(),
        });
      }
      toast("Comment posted");
      dispatch(cardActions.updateCommentsState("done"));
      createUserCommentsList(user.uid, {
        commentId: commentId,
        userId: user.uid,
        comment: comment,
        relatedPostId: postId,
        relatedUserId: userId,
      });
    });
    setComment("");
    setCommentVisible(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePostComment();
    }
  };
  return (
    <motion.div className="flex w-full gap-2 p-4 mb-4 rounded-2xl bg-slate-900" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <input
        type="text"
        placeholder={pointer ? `Add a comment to @${pointer}` : "Add a comment"}
        className="w-full h-10 p-2 duration-300 bg-transparent rounded-lg outline-none hover:bg-slate-800 text-md text-slate-200 focus:outline-none"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
      />
      <button
        className="w-32 h-10 px-4 py-2 duration-150 rounded-lg hover:bg-slate-600 text-md text-cWhite bg-fuchsia-800 focus:outline-none"
        onClick={handlePostComment}
      >
        Reply
      </button>
    </motion.div>
  );
}

export default FeedCardPageMiniCommentSection;
