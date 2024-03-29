import React, { useState } from "react";
import FeedCardButtons from "./Buttons/FeedCardButtons";
import { motion } from "framer-motion";
import FeedCardActionsSkeleton from "./FeedCardActions/FeedCardActionsSkeleton";
import { NavLink } from "react-router-dom";
import { Cross1Icon, DotsHorizontalIcon, LockClosedIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import ActionDetailsCard from "../ActionDetailsCard";
import { postsActions } from "../../../store/postsSlice";
import { deleteSelectedPost, editSelectedPost } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { DateFormatter } from "../../../utils/formatter";
import FeedCardOnlineStatus from "../FeedCardOnlineStatus";
import EditSpoilerButton from "./components/EditSpoilerButton";

function FeedSpoilerCard({ data, notification }) {
  const [settings, setSettings] = useState(false);
  const [rename, setRename] = useState(false);
  const [editedText, setEditedText] = useState(data.text);
  const [isEdited, setIsEdited] = useState(false);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const user = useSelector((state) => state.user.user?.nick);
  const dispatch = useDispatch();

  const date = DateFormatter(data);

  const handleSpoiler = (e) => {
    if (e.target.classList.contains("blur-sm")) {
      e.target.classList.remove("blur-sm");
    } else {
      e.target.classList.add("blur-sm");
    }
  };

  const handlePost = (e) => {
    if (e.key === "Enter") {
      editSelectedPost(data.postId, editedText, isSpoiler).then(() => {
        dispatch(postsActions.editPost({ text: editedText, postId: data.postId, spoiler: isSpoiler })) &&
          toast.success("Post edited successfully");
      });
      setRename(false);
      setSettings(false);
      setIsEdited(true);
    }
  };

  const deleteHandler = () => {
    deleteSelectedPost(localStorage.getItem("user"), data.postId).then((res) => {
      if (res) {
        dispatch(postsActions.deletePost(data.postId)) && toast.success("Post deleted successfully");
      }
    });
  };
  return (
    <div className="flex flex-col w-full">
      <motion.div
        className="flex flex-col w-full p-4 mb-4 bg-slate-900 rounded-xl"
        initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col justify-between w-full">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-4">
              {!data.photoURL && (
                <div className="relative w-12 h-12">
                  <div className="w-12 h-12 rounded-full bg-fuchsia-600"></div>
                  <FeedCardOnlineStatus username={!notification && data.nick === user ? false : true} data={data} />
                </div>
              )}
              {data.photoURL && (
                <div className="relative w-12 h-12">
                  <img className="object-cover w-12 h-12 rounded-full bg-fuchsia-600" loading="lazy" src={data.photoURL}></img>
                  <FeedCardOnlineStatus username={!notification && data.nick === user ? false : true} data={data} />
                </div>
              )}
              <div className="flex flex-col">
                <NavLink to={data.nick === user ? `/profile` : `/user/${data.nick}`}>
                  <p className="transition-all duration-300 text-md text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600">
                    @{data.nick}
                  </p>
                </NavLink>
                <p className="text-sm text-slate-400">{date}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex gap-2">
                <LockClosedIcon className="w-4 h-4 text-slate-200" />
                <p className="text-sm text-slate-400">Spoiler!</p>
                {(isEdited || data.edited) && <p className="text-sm text-slate-400">(Edited)</p>}
              </div>
              {!notification && data.nick === user && (
                <div className="flex flex-col">
                  <button onClick={() => setSettings(!settings)}>
                    <DotsHorizontalIcon className="w-6 h-6 transition-colors text-slate-400 hover:text-slate-200" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {!rename ? (
          <p className="py-4 transition-all duration-150 cursor-pointer select-none text-slate-200 blur-sm" onClick={handleSpoiler}>
            {data.text || data.content}
          </p>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              placeholder="Edit your post..."
              className="w-full px-4 py-2 my-4 transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
              value={editedText !== undefined ? editedText : data.text || data.content}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => handlePost(e)}
            />
            <EditSpoilerButton isSpoiler={isSpoiler} onClickAction={setIsSpoiler} />
          </div>
        )}
        {!notification && (
          <div className="flex gap-2">
            <FeedCardActionsSkeleton action={"likes"} number={data.likes} data={data} />
            <FeedCardActionsSkeleton action={"comments"} number={data.comments} data={data} />
            <FeedCardActionsSkeleton action={"reposts"} number={data.repost} data={data} />
          </div>
        )}
        {!notification && <FeedCardButtons data={data} />}
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
              {rename ? "Cancel Edit" : "Edit"}
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
    </div>
  );
}

export default FeedSpoilerCard;
