import { CheckIcon, Cross1Icon, DotsHorizontalIcon, Pencil1Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import ActionDetailsCard from "../../common/ActionDetailsCard";
import { changePinnedListTitle } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { MyListsActions } from "../../../store/myListsSlice";

function ModalHeader({ title, options = false }) {
  const [settings, setSettings] = useState(false);
  const [name, setName] = useState("");
  const [rename, setRename] = useState(false);
  const dispatch = useDispatch();
  const { modalHasData } = useSelector((state) => state.modal);
  const handleClick = () => {
    dispatch(modalActions.closeModal());
  };
  const renameHandler = () => {
    setRename(!rename);
  };

  const deleteHandler = () => {
    dispatch(modalActions.deleteList());
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
      <div className="flex items-center justify-between w-full pb-2">
        {!rename ? (
          <h1 className="text-2xl text-slate-200">{title}</h1>
        ) : (
          <div className="flex w-full gap-4">
            <input
              type="text"
              placeholder={`Rename ${title} to...`}
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
          {options && !rename && (
            <button className="cursor-pointer" onClick={() => setSettings(!settings)}>
              <DotsHorizontalIcon className="transition-all duration-300 w-7 h-7 text-slate-400 hover:text-slate-200" />
            </button>
          )}
          {!rename && <Cross1Icon className="w-6 h-6 ml-auto cursor-pointer text-slate-200 hover:text-slate-100" onClick={handleClick} />}
        </div>
      </div>
      {settings && !rename && (
        <ActionDetailsCard
          haveBorder={false}
          icon1={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={renameHandler}
            >
              <Pencil1Icon className="w-5 h-5 mr-2" />
              Rename this list
            </button>
          }
          icon2={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all bg-fuchsia-800/20 text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={deleteHandler}
            >
              <Cross1Icon className="w-5 h-5 mr-2" />
              Delete this list
            </button>
          }
        />
      )}
    </>
  );
}

export default ModalHeader;
