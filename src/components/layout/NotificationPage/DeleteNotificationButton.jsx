import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";
import { motion } from "framer-motion";
import { notificationActions } from "../../../store/notificationSlice";
import { useDispatch } from "react-redux";

function DeleteNotificationButton() {
  const dispatch = useDispatch();
  const handleDeletion = () => {
    deleteUserNotification(localStorage.getItem("user")).then(() => {
      dispatch(notificationActions.setNotification([]));
      dispatch(notificationActions.updateStatus("deleted"));
    });
  };

  return (
    <motion.button
      className="flex items-center justify-center w-12 h-10 transition-all duration-200 rounded-md group hover:bg-fuchsia-600/75"
      onClick={() => handleDeletion()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <TrashIcon className="transition-all duration-200 w-7 h-7 text-slate-600 group-hover:text-slate-200" />
    </motion.button>
  );
}

export default DeleteNotificationButton;
