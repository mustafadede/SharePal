import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { DateFormatter } from "../../utils/formatter";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
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
import FeedCardPhotoSection from "./FeedCardPageCommentCard/FeedCardPhotoSection";
import FeedCardPageHeaderSection from "./FeedCardPageCommentCard/FeedCardPageHeaderSection";
import FeedCardPageMainSection from "./FeedCardPageCommentCard/FeedCardPageMainSection";
import { useTranslation } from "react-i18next";

function FeedCardPageCommentCard({
  commentKey,
  commentId,
  nick,
  photo,
  comment,
  date,
  likes,
  likesList,
  notification = false,
  dataEdited = false,
  relatedPostId = false,
  relatedUserId = false,
  activities = false,
  data = false,
  userId,
}) {
  const { t, i18n } = useTranslation();
  const newDate = DateFormatter(date);
  const { user } = useSelector((state) => state.user);
  const { cardData } = useSelector((state) => state.card);
  const [settings, setSettings] = useState(false);
  const [rename, setRename] = useState(false);
  const { state: incomingData } = useLocation();
  const [editedText, setEditedText] = useState(comment);
  const [isEdited, setIsEdited] = useState(false);
  const dispatch = useDispatch();

  const handlePost = (e) => {
    if (e.key === "Enter") {
      updateSelectedComment(incomingData.pId, commentId, editedText).then(() => {
        dispatch(cardActions.editComments({ text: editedText, commentId: commentId }));
        i18n.language === "en" ? toast("Comment edited") : toast("Yorum düzenlendi");
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
      i18n.language === "en" ? toast("Comment deleted") : toast("Yorum silindi");
      setSettings(false);
      deleteUserCommentsList(user.uid, commentId);
    });
    cardData[0]?.comments > 0 && updateSelectedPost(cardData[0]?.postId, { comments: cardData[0]?.comments - 1 });
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
          <FeedCardPhotoSection photo={photo} />
          <div className="flex flex-col justify-center w-full">
            <FeedCardPageHeaderSection
              nick={nick}
              newDate={newDate}
              user={user}
              isEdited={isEdited}
              dataEdited={dataEdited}
              settings={settings}
              setSettings={setSettings}
              activities={activities}
              notification={notification}
            />
            <FeedCardPageMainSection
              nick={nick}
              commentKey={commentKey}
              commentId={commentId}
              comment={comment}
              likes={likes}
              likesList={likesList}
              notification={notification}
              rename={rename}
              editedText={editedText}
              setEditedText={setEditedText}
              handlePost={handlePost}
              relatedPostId={relatedPostId}
              relatedUserId={relatedUserId}
              data={data}
              userId={userId}
            />
          </div>
        </div>
      </motion.div>
      {settings && (
        <ActionDetailsCard
          haveBorder={false}
          icon1={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={() => setRename(!rename)}
            >
              <Pencil1Icon className="w-5 h-5 mr-2" />
              {t("feedPost.edit")}
            </button>
          }
          icon2={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all bg-fuchsia-800/20 text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={deleteHandler}
            >
              <Cross1Icon className="w-5 h-5 mr-2" />
              {t("notification.delete")}
            </button>
          }
        />
      )}
    </>
  );
}

export default FeedCardPageCommentCard;
