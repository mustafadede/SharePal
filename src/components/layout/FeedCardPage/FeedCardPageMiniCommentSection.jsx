import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCommentsList, createNotification, createUserCommentsList, updateSelectedPost } from "../../../firebase/firebaseActions";
import { cardActions } from "../../../store/cardSlice";
import { motion } from "framer-motion";

function FeedCardPageMiniCommentSection({ cardPost, pointer = false }) {
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handlePostComment = () => {
    const commentId = Date.now() + user.uid; // This is a temporary solution, it will be changed in the future
    if (comment.length === 0) return toast.error("Comment can't be empty");
    // createCommentsList(cardPost[0]?.postId, {
    //   commentId: commentId,
    //   userId: user.uid,
    //   comment: comment,
    //   relatedPostId: cardPost[0]?.postId,
    //   relatedUserId: cardPost[0]?.userId,
    // }).then(() => {
    //   updateSelectedPost(cardPost[0]?.userId.trim(""), cardPost[0]?.postId, { comments: cardPost[0]?.comments + 1 });
    //   dispatch(
    //     cardActions.updateComments({
    //       commentId: commentId,
    //       userId: user.uid,
    //       comment: comment,
    //       nick: user.nick,
    //       photo: user.photoURL,
    //       date: Date.now(),
    //       likes: 0,
    //       comments: 0,
    //       isEdited: false,
    //       relatedPostId: cardPost[0]?.postId,
    //       relatedUserId: cardPost[0]?.userId,
    //     })
    //   );
    //   if (user.uid !== cardPost[0]?.userId) {
    //     createNotification(cardPost[0]?.userId, {
    //       type: "comment",
    //       from: { uid: user.uid, nick: user.nick, photo: user.photoURL, postId: cardPost[0]?.postId, comment: comment },
    //       date: Date.now(),
    //     });
    //   }
    //   toast("Comment posted");
    //   dispatch(cardActions.updateCommentsState("done"));
    //   createUserCommentsList(user.uid, {
    //     commentId: commentId,
    //     userId: user.uid,
    //     comment: comment,
    //     relatedPostId: cardPost[0]?.postId,
    //     relatedUserId: cardPost[0]?.userId,
    //   });
    // });
    setComment("");
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
