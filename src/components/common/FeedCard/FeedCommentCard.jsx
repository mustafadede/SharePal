import React, { useState } from "react";
import FeedCardButtons from "./Buttons/FeedCardButtons";
import { motion } from "framer-motion";
import FeedCardActionsSkeleton from "./FeedCardActions/FeedCardActionsSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import ActionDetailsCard from "../ActionDetailsCard";
import { postsActions } from "../../../store/postsSlice";
import { deleteSelectedPost, editSelectedPost } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { DateFormatter } from "../../../utils/formatter";
import FeedCardHeader from "./components/FeedCardHeader";
import EditSpoilerButton from "./components/EditSpoilerButton";
import FeedCardPageMiniCommentSection from "../../layout/FeedCardPage/FeedCardPageMiniCommentSection";
import { useTranslation } from "react-i18next";

function FeedCommentCard({ data, notification, share }) {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState(false);
  const [rename, setRename] = useState(false);
  const [editedText, setEditedText] = useState(data.text);
  const [isEdited, setIsEdited] = useState(false);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user?.nick);
  const date = DateFormatter(data);

  const handlePost = (e) => {
    if (e.key === "Enter") {
      editSelectedPost(data.postId, editedText, isSpoiler).then(() => {
        dispatch(postsActions.editPost({ text: editedText, postId: data.postId, spoiler: isSpoiler }));
        if (i18n.language === "en") {
          toast.success("Post edited successfully");
        } else {
          toast.success("Gönderi başarıyla düzenlendi");
        }
      });
      setRename(false);
      setSettings(false);
      setIsEdited(true);
    }
  };

  const deleteHandler = () => {
    deleteSelectedPost(localStorage.getItem("user"), data.postId).then(() => {
      dispatch(postsActions.deletePost(data.postId));
      if (i18n.language === "en") {
        toast.success("Post deleted successfully");
      } else {
        toast.success("Gönderi başarıyla silindi");
      }
      setRename(false);
      setSettings(false);
    });
  };

  return (
    <div className="flex flex-col w-full">
      <motion.div
        className="flex flex-col w-full p-4 mb-4 bg-slate-900 rounded-xl"
        initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/*Comment Card Top section: Profile Picture and Name start */}
        <FeedCardHeader
          data={data}
          date={date}
          isEdited={isEdited}
          setSettings={setSettings}
          settings={settings}
          user={user}
          notification={notification}
          share={share}
        />
        {/*Comment Card Top section: Profile Picture and Name end */}
        {/*Comment Card Middle Top section: Input start */}
        {!rename ? (
          <p className="py-4 text-slate-200">{data?.text || data.content}</p>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <textarea
              type="text"
              placeholder={t("feedCardPageMainSection.placeholder")}
              className="w-full h-20 px-4 py-2 my-4 transition-colors outline-none max-h-28 bg-slate-800 text-cWhite focus:bg-opacity-40 rounded-2xl"
              value={editedText !== undefined ? editedText : data.text || data.content}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => handlePost(e)}
            />
            <EditSpoilerButton isSpoiler={isSpoiler} onClickAction={setIsSpoiler} />
          </div>
        )}
        {/*Comment Card Middle Top section: Input end */}
        {/*Comment Card Middle Bottom section: Stats start */}
        {!notification && (
          <div className="flex gap-2">
            <FeedCardActionsSkeleton action={t("feedPost.likes")} number={data.likes} data={data} />
            <FeedCardActionsSkeleton action={t("feedPost.comments")} number={data.comments} data={data} />
            <FeedCardActionsSkeleton action={"Reposts"} number={data.reposts} data={data} />
          </div>
        )}
        {/*Comment Card Middle Bottom section: Stats end */}
        {/*Comment Card Bottom section: Buttons starts */}
        {!notification && <FeedCardButtons data={data} isCommentVisible={isCommentVisible} setCommentVisible={setIsCommentVisible} />}
        {/*Comment Card Bottom section: Buttons end */}
      </motion.div>
      {isCommentVisible && (
        <FeedCardPageMiniCommentSection
          postId={data.postId}
          userId={data.userId}
          comments={data.comments}
          setCommentVisible={setIsCommentVisible}
        />
      )}
      {settings && (
        <ActionDetailsCard
          haveBorder={false}
          icon1={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={() => setRename(!rename)}
            >
              <Pencil1Icon className="w-5 h-5 mr-2" />
              {rename ? t("feedPost.cancelEdit") : t("feedPost.edit")}
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
    </div>
  );
}

export default FeedCommentCard;
