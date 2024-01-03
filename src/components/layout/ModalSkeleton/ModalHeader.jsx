import { CheckIcon, Cross1Icon, DotsHorizontalIcon, InfoCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import ActionDetailsCard from "../../common/ActionDetailsCard";
import { changePinnedListTitle, removePinnedList } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { MyListsActions } from "../../../store/myListsSlice";
import { motion } from "framer-motion";

function ModalHeader({ title, options = false }) {
  const [settings, setSettings] = useState(false);
  const [name, setName] = useState("");
  const [rename, setRename] = useState(false);
  const [info, setInfo] = useState(true);
  const dispatch = useDispatch();
  const { modalHasData } = useSelector((state) => state.modal);

  const handleClick = () => {
    dispatch(modalActions.closeModal());
  };
  const renameHandler = () => {
    setRename(!rename);
  };

  const deleteHandler = () => {
    removePinnedList(modalHasData.id).then(() => {
      dispatch(MyListsActions.deleteList(modalHasData.id));
      toast.success("List removed successfully!");
    });
    dispatch(modalActions.closeModal());
  };

  const changeHandler = (e) => {
    setName(e.target.value);
  };

  const renameCheckHandler = () => {
    if (name === "") {
      toast.error("Please enter a valid name");
      return;
    }
    if (name === modalHasData.title) {
      toast.error("Please enter a different name");
      return;
    }

    changePinnedListTitle({ title: name, id: modalHasData.id }).then(() => {
      dispatch(modalActions.renameList(name));
      dispatch(MyListsActions.updateListTitle({ title: name, listId: modalHasData.id }));
      toast.success("List renamed successfully");
      setRename(false);
    });
  };

  const keyDownHandler = (e) => {
    if (e.key === "Escape") {
      setRename(false);
    }
    if (e.key === "Enter" && e.target.value === "") {
      toast.error("Please enter a valid name");
      return;
    }
    if (e.key === "Enter" && e.target.value === modalHasData.title) {
      toast.error("Please enter a different name");
      return;
    }
    if (e.key === "Enter") {
      changePinnedListTitle({ title: e.target.value, id: modalHasData.id }).then(() => {
        dispatch(modalActions.renameList(e.target.value));
        dispatch(MyListsActions.updateListTitle({ title: name, listId: modalHasData.id }));
        toast.success("List renamed successfully");
        setRename(false);
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between w-full">
        {!rename ? (
          <div className="flex justify-center gap-1">
            <h1 className="text-2xl text-slate-200">
              {title ? title : modalHasData.title.length < 32 ? modalHasData.title : modalHasData.title.slice(0, 32) + "..."}
            </h1>
            {options && (
              <button className="px-2 py-2 text-sm w-fit text-slate-200" onClick={() => setInfo(!info)}>
                <InfoCircledIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full gap-4">
            <input
              type="text"
              placeholder={`Rename ${modalHasData.title} to...`}
              className="w-full py-1 text-lg text-white transition-all bg-transparent border-b-2 outline-none focus:border-slate-900"
              onChange={(e) => changeHandler(e)}
              autoFocus={true}
              onKeyDown={keyDownHandler}
            />
            <button
              className="flex items-center justify-center transition-all rounded-xl hover:bg-slate-800 text-slate-200 bg-fuchsia-800/20"
              onClick={renameCheckHandler}
            >
              <CheckIcon className="w-10 h-7" />
            </button>
            <button className="text-slate-200" onClick={() => setRename(false)}>
              <Cross1Icon className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="flex gap-2">
          {localStorage.getItem("user") && options && !rename && (
            <button className="cursor-pointer" onClick={() => setSettings(!settings)}>
              <DotsHorizontalIcon className="transition-all duration-300 w-7 h-7 text-slate-400 hover:text-slate-200" />
            </button>
          )}
          {!rename && <Cross1Icon className="w-6 h-6 ml-auto cursor-pointer text-slate-200 hover:text-slate-100" onClick={handleClick} />}
        </div>
      </div>
      {options && info && (
        <motion.div
          className="flex justify-between mt-2"
          initial={{ opacity: 0, y: -7 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
        >
          <p className="text-lg text-slate-500 ">Creation Time: {modalHasData.date}</p>
          <p className="text-lg text-slate-500 ">Total Items: {modalHasData.list ? Object.keys(modalHasData.list)?.length : 0}</p>
        </motion.div>
      )}
      {localStorage.getItem("user") && settings && !rename && (
        <ActionDetailsCard
          haveBorder={false}
          haveBottom={false}
          icon1={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={renameHandler}
            >
              <Pencil1Icon className="w-5 h-5 mr-2" />
              Rename
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

export default ModalHeader;
