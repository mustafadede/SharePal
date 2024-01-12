import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCommentsList, updateSelectedPost } from "../../../firebase/firebaseActions";
import { cardActions } from "../../../store/cardSlice";

function FeedCardPageCommentSection({ cardPost }) {
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handlePostComment = () => {
    if (comment.length === 0) return toast.error("Comment can't be empty");
    createCommentsList(cardPost[0]?.postId, { userId: user.uid, comment: comment }).then(() => {
      updateSelectedPost(cardPost[0]?.userId, cardPost[0]?.postId, { comments: cardPost[0]?.comments + 1 });
      dispatch(
        cardActions.updateComments({
          userId: user.uid,
          comment: comment,
          nick: user.nick,
          photo: user.photoURL,
          date: Date.now(),
          likes: 0,
          comments: 0,
        })
      );
      toast("Comment posted");
    });
    setComment("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePostComment();
    }
  };
  return (
    <div className="flex w-full gap-2 p-4 mb-4 rounded-2xl bg-slate-900">
      {user?.photoURL && <img src={user.photoURL} alt="profile" className="object-cover h-10 rounded-full w-14" />}
      {!user?.photoURL && <div className="h-10 rounded-full w-14 bg-fuchsia-600"></div>}
      <input
        type="text"
        placeholder="Add a comment"
        autoFocus
        className="w-full h-10 p-2 duration-300 bg-transparent rounded-lg hover:bg-slate-800 text-md text-slate-200 focus:outline-none"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
      />
      <button className="w-32 h-10 px-4 py-2 duration-150 rounded-lg hover:bg-slate-600 text-md text-cWhite bg-fuchsia-800 focus:outline-none">
        Post
      </button>
    </div>
  );
}

export default FeedCardPageCommentSection;
