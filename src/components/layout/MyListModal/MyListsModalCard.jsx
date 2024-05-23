import { Cross1Icon, DrawingPinFilledIcon, DrawingPinIcon, PlusIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyListsActions } from "../../../store/myListsSlice";
import { toast } from "react-toastify";
import { modalActions } from "../../../store/modalSlice";
import {
  removePinnedList,
  updatePinnedList,
  updateSelectedUserLists,
  updateSelectedUserSuggestionLists,
} from "../../../firebase/firebaseActions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MyListsModalCard({
  title,
  id,
  listNum,
  disabled = false,
  isPinned = false,
  list,
  date,
  pinnedDisabled = false,
  suggestionList = false,
  from,
  userId,
  nodeId,
}) {
  const { i18n } = useTranslation();
  const [pinnedCount, setPinedCount] = useState(0);
  const dispatch = useDispatch();
  const { modalHasData } = useSelector((state) => state.modal);
  const { myLists } = useSelector((state) => state.myLists);
  const navigate = useNavigate();

  useEffect(() => {
    const pinnedLists = myLists.filter((list) => list.isPinned);
    setPinedCount(pinnedLists.length);
  }, [myLists]);

  const handlePin = (listNum) => {
    if (!isPinned && pinnedCount === 2) {
      i18n.language === "tr" ? toast.error("En fazla 2 listeyi sabitleyebilirsiniz.") : toast.error("You can pin up to 2 lists.");
      return;
    }
    if (!isPinned) {
      dispatch(MyListsActions.setPinned(listNum));
      i18n.language === "tr" ? toast.success("Liste sabitlendi!") : toast.success("List pinned successfully!");
      updateSelectedUserLists(localStorage.getItem("user"), { isPinned: true, id });
    } else {
      dispatch(MyListsActions.setPinned(listNum));
      updateSelectedUserLists(localStorage.getItem("user"), { isPinned: false, id });
      i18n.language === "tr" ? toast.success("Liste sabitlenenlerden kaldırıldı!") : ttoast.error("List unpinned successfully!");
    }
  };

  const handleRemove = (id) => {
    removePinnedList(id).then(() => {
      dispatch(MyListsActions.deleteList(id));
      i18n.language === "tr" ? toast.success("Liste silindi!") : toast.success("List deleted successfully!");
    });
  };

  const clickHandler = (id, title, list, date) => {
    dispatch(
      modalActions.openModal({ name: "listModal", data: suggestionList ? { id, title, list, date, from } : { id, title, list, date } })
    );
  };

  const addHandler = () => {
    if (modalHasData.releaseDate && !suggestionList) {
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
      );
      i18n.language === "en" ? toast.success("Movie added successfully!") : toast.success("Film başarıyla eklendi!");
    } else if (suggestionList && modalHasData.releaseDate) {
      updateSelectedUserSuggestionLists(userId, nodeId, {
        id: modalHasData.movieId || modalHasData.id,
        title: modalHasData.title,
        mediaType: modalHasData.mediaType,
        poster: modalHasData.poster,
        releaseDate: modalHasData.releaseDate,
        backdrop: modalHasData.backdrop,
      });
      i18n.language === "en" ? toast.success("Movie added successfully!") : toast.success("Film başarıyla eklendi!");
      dispatch(modalActions.closeModal());
    } else {
      navigate("/search");
      dispatch(modalActions.closeModal());
      i18n.language === "en" ? toast.error("Please select a movie/series first.") : toast.error("Lütfen önce bir film/dizi seçin.");
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
        {title?.length > 28 ? title.slice(0, 28) + "..." : title}
      </p>
      <div className="flex items-center gap-2">
        {!disabled && from?.uid === localStorage.getItem("user") && (
          <button className="ml-auto transition-all rounded-lg" onClick={() => addHandler()}>
            <PlusIcon className="w-6 h-6 ml-auto transition-all text-slate-200 hover:text-fuchsia-600" />
          </button>
        )}
        {!pinnedDisabled && (
          <button className="ml-auto rounded-lg" onClick={() => handlePin(listNum)}>
            {!isPinned ? (
              <DrawingPinIcon className="w-6 h-6 ml-auto transition-all text-slate-200 hover:text-fuchsia-600" />
            ) : (
              <DrawingPinFilledIcon className={`w-6 h-6 ml-auto text-fuchsia-600`} />
            )}
          </button>
        )}
        {!disabled && !pinnedDisabled && (
          <button className="ml-auto rounded-lg" onClick={() => handleRemove(id)}>
            <Cross1Icon className="w-6 h-6 ml-auto transition-all text-slate-200 hover:text-red-600" />
          </button>
        )}
      </div>
    </div>
  );
}

export default MyListsModalCard;
