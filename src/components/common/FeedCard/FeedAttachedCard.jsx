import { BookmarkFilledIcon, BookmarkIcon, Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import FeedCardButtons from "./Buttons/FeedCardButtons";
import { motion } from "framer-motion";
import FeedCardActionsSkeleton from "./FeedCardActions/FeedCardActionsSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { deleteSelectedPost, editSelectedPost } from "../../../firebase/firebaseActions";
import ActionDetailsCard from "../ActionDetailsCard";
import { toast } from "react-toastify";
import { postsActions } from "../../../store/postsSlice";
import useSearchWithYear from "../../../hooks/useSearchWithYear";
import { DateFormatter } from "../../../utils/formatter";
import AttachedItem from "./components/AttachedItem";
import FeedCardHeader from "./components/FeedCardHeader";
import FeedCardPageMiniCommentSection from "../../layout/FeedCardPage/FeedCardPageMiniCommentSection";
import EditSpoilerButton from "./components/EditSpoilerButton";
import { useTranslation } from "react-i18next";

function FeedAttachedCard({ data, attachedData, notification, share }) {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState(false);
  const [rename, setRename] = useState(false);
  const [editedText, setEditedText] = useState(data.text);
  const [isEdited, setIsEdited] = useState(false);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const user = useSelector((state) => state.user.user?.nick);
  const dispatch = useDispatch();

  const date = DateFormatter(data);

  // const onClickHandler = () => {
  //   dispatch(modalActions.openModal({ name: "pinnedModal", data: data.attachedFilm }));
  //   setBookmarked(!bookmarked);
  // };

  const handleSpoiler = (e) => {
    if (e.target.classList.contains("blur-sm")) {
      e.target.classList.remove("blur-sm");
    } else {
      e.target.classList.add("blur-sm");
    }
  };

  const deleteHandler = () => {
    deleteSelectedPost(data.postId).then(() => {
      dispatch(postsActions.deletePost(data.postId));
      if (i18n.language === "en") {
        toast.success("Post deleted successfully");
      } else {
        toast.success("Gönderi başarıyla silindi");
      }
    });
  };

  const onClickHandler = () => {
    const movieInfoHandler = () => {
      useSearchWithYear(data.attachedFilm.title, data.attachedFilm.releaseDate).then((data) => {
        if (data) {
          dispatch(
            modalActions.openModal({
              name: "searchCardModal",
              data: {
                id: data.id,
                title: data.original_title || data.original_name,
                poster: data.poster_path,
                releaseDate: data.release_date || data.first_air_date,
                overview: data.overview,
                vote: data.vote_average,
                backdrop: data.backdrop_path,
                genres: data.genre_ids,
                mediaType: data.media_type,
                upcoming: data.upcoming,
              },
            })
          );
        }
      });
    };
    movieInfoHandler();
  };

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
      setIsEdited(true);
      setSettings(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <motion.div
        className="flex flex-col w-full p-4 mb-4 bg-slate-900 rounded-xl"
        initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FeedCardHeader
          data={data}
          date={date}
          isEdited={isEdited}
          setSettings={setSettings}
          settings={settings}
          user={user}
          notification={notification}
          share={share}
          setRename={setRename}
        />
        {data.spoiler && !rename && (
          <p className={"py-4 text-slate-200 cursor-pointer duration-150 transition-all  blur-sm select-none"} onClick={handleSpoiler}>
            {data.text || data.content}
          </p>
        )}
        {!data.spoiler && !rename && <p className="py-4 text-slate-200">{data.text || data.content}</p>}
        {rename && (
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
        <AttachedItem data={data} attachedData={attachedData} onClickHandler={onClickHandler} />
        <div className="flex gap-2 mt-1">
          <FeedCardActionsSkeleton action={t("feedPost.likes")} number={data.likes} data={data} />
          <FeedCardActionsSkeleton action={t("feedPost.comments")} number={data.comments} data={data} />
          <FeedCardActionsSkeleton action={"Reposts"} number={data.repost} data={data} />
        </div>
        {!notification && <FeedCardButtons data={data} isCommentVisible={isCommentVisible} setCommentVisible={setIsCommentVisible} />}
      </motion.div>
      {isCommentVisible && (
        <FeedCardPageMiniCommentSection
          postId={data.postId}
          userId={data.userId}
          comments={data.comments}
          setCommentVisible={setIsCommentVisible}
        />
      )}
      {!notification && settings && (
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

export default FeedAttachedCard;
