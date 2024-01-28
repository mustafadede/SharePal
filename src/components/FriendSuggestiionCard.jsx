import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usersSuggestionsListActions } from "../store/UsersSuggestionsListSlice";
import { deleteSelectedUserSuggestionList } from "../firebase/firebaseActions";

function FriendSuggestionCard({ title, id, listNum, list, date }) {
  const dispatch = useDispatch();
  const { modalHasData } = useSelector((state) => state.modal);
  const { profileUser } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(usersSuggestionsListActions.removeUsersSuggestionsList(id));
    deleteSelectedUserSuggestionList(profileUser.uid, id).then(() => {
      toast.success("List removed successfully!");
    });
  };

  const clickHandler = (id, title, list, date) => {
    toast("Coming soon...");
  };

  const addHandler = () => {
    toast("Coming soon...");
  };
  return (
    <div
      className={`flex items-center cursor-pointer justify-between w-full h-10  overflow-hidden group hover:border-fuchsia-400 border-slate-200 border px-4 py-6 mb-4 rounded-xl`}
    >
      <p className={` text-slate-200 w-fullgroup-hover:text-fuchsia-400 text-xl`} onClick={() => clickHandler(id, title, list, date)}>
        {title}
      </p>
      <div className="flex items-center gap-2">
        {
          <button className="ml-auto transition-all rounded-lg" onClick={() => addHandler()}>
            <PlusIcon className="w-6 h-6 ml-auto transition-all text-slate-200 hover:text-fuchsia-600" />
          </button>
        }
        {
          <button className="ml-auto rounded-lg" onClick={() => handleRemove(id)}>
            <Cross1Icon className="w-6 h-6 ml-auto transition-all text-slate-200 hover:text-red-600" />
          </button>
        }
      </div>
    </div>
  );
}

export default FriendSuggestionCard;
