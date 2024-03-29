import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import FeedCardActionsSkeleton from "./FeedCard/FeedCardActions/FeedCardActionsSkeleton";
import { DateFormatter } from "../../utils/formatter";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Cross1Icon, DotsHorizontalIcon, HeartIcon, Pencil1Icon } from "@radix-ui/react-icons";
import ActionDetailsCard from "./ActionDetailsCard";
import { toast } from "react-toastify";
import {
  deleteSelectedComment,
  deleteUserCommentsList,
  updateSelectedComment,
  updateSelectedPost,
  updateUserCommentsList,
} from "../../firebase/firebaseActions";
import { cardActions } from "../../store/cardSlice";
import FeedCardPageAction from "../layout/FeedCardPage/FeedCardPageAction";
import FeedCardPageMiniCommentSection from "../layout/FeedCardPage/FeedCardPageMiniCommentSection";
import FeedCardButtons from "./FeedCard/Buttons/FeedCardButtons";

function FeedCardPageCommentCard({
  commentId,
  nick,
  photo,
  comment,
  date,
  likes,
  comments,
  notification = false,
  dataEdited = false,
  relatedPostId = false,
  relatedUserId = false,
  activities = false,
}) {
  const newDate = DateFormatter(date);
  const { user } = useSelector((state) => state.user);
  const { cardData } = useSelector((state) => state.card);
  const [settings, setSettings] = useState(false);
  const [rename, setRename] = useState(false);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const { state: incomingData } = useLocation();
  const [editedText, setEditedText] = useState(comment);
  const [isEdited, setIsEdited] = useState(false);
  const dispatch = useDispatch();

  const handlePost = (e) => {
    if (e.key === "Enter") {
      updateSelectedComment(incomingData.pId, commentId, editedText).then(() => {
        dispatch(cardActions.editComments({ text: editedText, commentId: commentId }));
        toast("Comment edited");
        updateUserCommentsList(user.uid, commentId, editedText);
      });
      setIsEdited(true);
      setRename(false);
      setSettings(false);
    }
  };

  const deleteHandler = () => {
    deleteSelectedComment(incomingData.pId, commentId).then(() => {
      dispatch(cardActions.deleteComments(commentId));
      toast("Comment deleted");
      setSettings(false);
      deleteUserCommentsList(user.uid, commentId);
    });
    cardData[0]?.comments > 0 && updateSelectedPost(cardData[0]?.userId, cardData[0]?.postId, { comments: cardData[0]?.comments - 1 });
  };

  return (
    <>
      <motion.div
        className="p-4 mb-4 bg-slate-900 rounded-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex gap-2">
          <div className="relative w-12 h-12">
            {!photo && <div className="w-12 h-12 rounded-full bg-fuchsia-600"></div>}
            {photo && <img src={photo} alt="profile" className="object-cover w-10 h-10 rounded-full" />}
          </div>
          <div className="flex flex-col justify-center w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <NavLink
                  to={nick === user?.nick ? `/profile` : `/user/${nick}`}
                  className="text-md hover:text-fuchsia-600 text-slate-200 hover:underline"
                >
                  @{nick}
                </NavLink>
                <p className="text-sm text-slate-400">{newDate}</p>
              </div>
              <div className="flex items-center gap-2">
                {(isEdited || dataEdited) && <p className="text-xs text-slate-400">(Edited)</p>}
                {!notification && nick === user?.nick && !activities && (
                  <button onClick={() => setSettings(!settings)}>
                    <DotsHorizontalIcon className="w-6 h-6 transition-colors text-slate-400 hover:text-slate-200" />
                  </button>
                )}
              </div>
            </div>
            {!rename ? (
              <div className="flex justify-between">
                <p className="py-1 text-slate-200">{comment}</p>
                <div className="flex items-center ">
                  <button>
                    <HeartIcon className="w-6 h-5 transition-all text-slate-400 hover:text-slate-200" />
                  </button>
                </div>
              </div>
            ) : (
              <input
                type="text"
                placeholder="Edit your post..."
                className="w-full px-4 py-2 my-4 transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
                value={editedText !== undefined ? editedText : comment}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={(e) => handlePost(e)}
              />
            )}
            {!notification && (
              <div className="flex gap-2">
                <FeedCardActionsSkeleton action={"likes"} number={likes} data={0} />
              </div>
            )}
          </div>
        </div>
      </motion.div>
      {isCommentVisible && <FeedCardPageMiniCommentSection pointer={nick} />}
      {settings && (
        <ActionDetailsCard
          haveBorder={false}
          icon1={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={() => setRename(!rename)}
            >
              <Pencil1Icon className="w-5 h-5 mr-2" />
              Edit
            </button>
          }
          icon2={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all bg-fuchsia-800/20 text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={deleteHandler}
            >
              <Cross1Icon className="w-5 h-5 mr-2" />
              Delete
            </button>
          }
        />
      )}
    </>
  );
}

export default FeedCardPageCommentCard;
