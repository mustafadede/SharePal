import React, { useState } from "react";
import FeedCardButtons from "./Buttons/FeedCardButtons";
import { motion } from "framer-motion";
import FeedCardActionsSkeleton from "./FeedCardActions/FeedCardActionsSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Cross1Icon, DotsHorizontalIcon, Pencil1Icon } from "@radix-ui/react-icons";
import ActionDetailsCard from "../ActionDetailsCard";
import { postsActions } from "../../../store/postsSlice";
import { deleteSelectedPost, editSelectedPost } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { DateFormatter } from "../../../utils/formatter";
import FeedCardOnlineStatus from "../FeedCardOnlineStatus";
import FeedCardHeader from "./components/FeedCardHeader";

function FeedCommentCard({ data, notification }) {
  const [settings, setSettings] = useState(false);
  const [rename, setRename] = useState(false);
  const [editedText, setEditedText] = useState(data.text);
  const [isEdited, setIsEdited] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user?.nick);
  const date = DateFormatter(data);

  const handlePost = (e) => {
    if (e.key === "Enter") {
      editSelectedPost(data.postId, editedText).then(() => {
        dispatch(postsActions.editPost({ text: editedText, postId: data.postId })) && toast.success("Post edited successfully");
      });
      setRename(false);
      setSettings(false);
      setIsEdited(true);
    }
  };

  const deleteHandler = () => {
    deleteSelectedPost(localStorage.getItem("user"), data.postId).then(() => {
      dispatch(postsActions.deletePost(data.postId)) && toast.success("Post deleted successfully");
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
        />
        {/*Comment Card Top section: Profile Picture and Name end */}
        {/*Comment Card Middle Top section: Input start */}
        {!rename ? (
          <p className="py-4 text-slate-200">{data?.text || data.content}</p>
        ) : (
          <input
            type="text"
            placeholder="Edit your post..."
            className="w-full px-4 py-2 my-4 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
            value={editedText !== undefined ? editedText : data.text || data.content}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={(e) => handlePost(e)}
          />
        )}
        {/*Comment Card Middle Top section: Input end */}
        {/*Comment Card Middle Bottom section: Stats start */}
        {!notification && (
          <div className="flex gap-2">
            <FeedCardActionsSkeleton action={"likes"} number={data.likes} data={data} />
            <FeedCardActionsSkeleton action={"comments"} number={data.comments} data={data} />
            <FeedCardActionsSkeleton action={"reposts"} number={data.reposts} data={data} />
          </div>
        )}
        {/*Comment Card Middle Bottom section: Stats end */}
        {/*Comment Card Bottom section: Buttons starts */}
        {!notification && <FeedCardButtons data={data} />}
        {/*Comment Card Bottom section: Buttons end */}
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
    </div>
  );
}

export default FeedCommentCard;
