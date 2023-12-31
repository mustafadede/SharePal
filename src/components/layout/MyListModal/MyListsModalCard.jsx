import { Cross1Icon, DrawingPinFilledIcon, DrawingPinIcon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyListsActions } from "../../../store/myListsSlice";
import { toast } from "react-toastify";
import { modalActions } from "../../../store/modalSlice";
import { removePinnedList, updatePinnedList, updateSelectedUserLists } from "../../../firebase/firebaseActions";
import { useNavigate } from "react-router-dom";

function MyListsModalCard({ title, id, listNum, disabled = false, isPinned = false, list, date }) {
  const dispatch = useDispatch();
  const { modalHasData } = useSelector((state) => state.modal);
  const { myLists } = useSelector((state) => state.myLists);
  const navigate = useNavigate();
  const handlePin = (listNum) => {
    if (!isPinned) {
      dispatch(MyListsActions.setPinned(listNum));
      toast.success("List pinned successfully!");
      updateSelectedUserLists(localStorage.getItem("user"), { isPinned: true, id });
    } else {
      dispatch(MyListsActions.setPinned(listNum));
      updateSelectedUserLists(localStorage.getItem("user"), { isPinned: false, id });
      toast.error("List unpinned successfully!");
    }
  };

  const handleRemove = (id) => {
    removePinnedList(id).then(() => {
      dispatch(MyListsActions.deleteList(id));
      toast.success("List removed successfully!");
    });
  };

  const clickHandler = (id, title, list, date) => {
    dispatch(modalActions.openModal({ name: "listModal", data: { id, title, list, date, listNum } }));
  };

  const addHandler = () => {
    if (modalHasData.releaseDate) {
      updatePinnedList({
        id: myLists[listNum].id,
        title: modalHasData.title,
        poster: modalHasData.poster,
        releaseDate: modalHasData.releaseDate,
        backdrop: modalHasData.backdrop,
      });
      dispatch(
        MyListsActions.addListItem({
          data: {
            id: myLists[listNum].id,
            title: modalHasData.title,
            poster: modalHasData.poster,
            releaseDate: modalHasData.releaseDate,
            backdrop: modalHasData.backdrop,
          },
          listId: listNum,
        })
      ) && toast.success("Movie added successfully!");
    } else {
      navigate("/search");
      dispatch(modalActions.closeModal());
      toast.error("Please select a movie/series first.");
    }
  };
  return (
    <div
      className={`flex items-center cursor-pointer justify-between w-full h-10  overflow-hidden group ${
        disabled ? "" : "hover:border-fuchsia-400 border-slate-200 border px-4 py-6 mb-4"
      } rounded-xl`}
    >
      <p
        className={` text-slate-200 w-full ${disabled ? "text-md" : "group-hover:text-fuchsia-400 text-xl"}`}
        onClick={() => clickHandler(id, title, list, date)}
      >
        {title}
      </p>
      <div className="flex items-center gap-2">
        {!disabled && (
          <button className="ml-auto transition-all rounded-lg" onClick={() => addHandler()}>
            <PlusIcon className="w-6 h-6 ml-auto transition-all text-slate-200 hover:text-fuchsia-600" />
          </button>
        )}
        <button className="ml-auto rounded-lg" onClick={() => handlePin(listNum)}>
          {!isPinned ? (
            <DrawingPinIcon className="w-6 h-6 ml-auto transition-all text-slate-200 hover:text-fuchsia-600" />
          ) : (
            <DrawingPinFilledIcon className={`w-6 h-6 ml-auto text-fuchsia-600`} />
          )}
        </button>
        {!disabled && (
          <button className="ml-auto rounded-lg" onClick={() => handleRemove(id)}>
            <Cross1Icon className="w-6 h-6 ml-auto transition-all text-slate-200 hover:text-red-600" />
          </button>
        )}
      </div>
    </div>
  );
}

export default MyListsModalCard;
