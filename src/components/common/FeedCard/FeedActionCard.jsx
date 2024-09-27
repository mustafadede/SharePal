import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Cross1Icon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import ActionDetailsCard from "../ActionDetailsCard";
import { postsActions } from "../../../store/postsSlice";
import { deleteSelectedPost } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { TextShorter } from "../../../utils/formatter";
import FeedActionCardWantToWatchComponent from "./FeedActionCard/FeedActionCardWantToWatchComponent";
import { useTranslation } from "react-i18next";

function FeedActionCard({ data, notification }) {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user?.nick);
  // utils functions
  const title = TextShorter(data.attachedAction.title, 30);

  const deleteHandler = () => {
    deleteSelectedPost(data.postId).then(() => {
      dispatch(postsActions.deletePost(data.postId));
      toast.success("Post deleted successfully");
    });
  };

  return (
    <div className="flex flex-col">
      <motion.div
        className="flex justify-between w-full p-4 mb-4 bg-slate-900 rounded-2xl"
        initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
        animate={{ opacity: 1, y: 0 }}
      >
        {data.actionName === "wantToWatch" ? <FeedActionCardWantToWatchComponent data={data} title={title} user={user} /> : null}
        {!notification && data.nick === user && (
          <button onClick={() => setSettings(!settings)}>
            <DotsHorizontalIcon className="w-6 h-6 transition-colors duration-150 text-slate-200 hover:text-cWhite" />
          </button>
        )}
      </motion.div>
      {/*Action Card Bottom section start */}
      {settings && (
        <ActionDetailsCard
          haveBorder={false}
          icon1={
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
      {/*Action Card Bottom section end */}
    </div>
  );
}

export default FeedActionCard;
