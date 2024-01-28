import React, { useEffect, useState } from "react";
import ModalHeader from "../../layout/ModalSkeleton/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import Suggestion from "../Suggestion";
import { toast } from "react-toastify";
import { createUserSuggestionLists, getSelectedUserSuggestionLists } from "../../../firebase/firebaseActions";
import { usersSuggestionsListActions } from "../../../store/UsersSuggestionsListSlice";
import FriendSuggestionCard from "../../FriendSuggestiionCard";
import InfoLabel from "../InfoLabel";

function CreateFriendList() {
  const { profileUser } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const { usersSuggestionsList } = useSelector((state) => state.usersSuggestionsList);
  const [listname, setListname] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getSelectedUserSuggestionLists(profileUser.uid).then((lists) => {
      dispatch(usersSuggestionsListActions.initialUsersSuggestionsList(lists));
    });
  }, []);

  const handleCreateList = () => {
    if (listname !== "") {
      const id = Math.random().toString(36).substr(2, 9);
      createUserSuggestionLists(profileUser.uid, {
        id: id,
        title: listname,
        date: new Date().toLocaleDateString(),
        from: {
          uid: localStorage.getItem("user"),
          nick: user.nick,
        },
      }).then(() => {
        toast.success("List created successfully!");
        dispatch(
          usersSuggestionsListActions.updateUsersSuggestionsList({
            id: id,
            title: listname,
            date: new Date().toLocaleDateString(),
            from: {
              uid: localStorage.getItem("user"),
              nick: user.nick,
            },
          })
        );
      });
    } else {
      return toast.error("List name cannot be empty.");
    }
  };
  const handleListener = (e) => {
    if (e.key === "Enter") {
      handleCreateList();
    }
  };

  const handleSuggestion = (suggestion) => {
    const id = Math.random().toString(36).substr(2, 9);
    createUserSuggestionLists(profileUser.uid, {
      id: id,
      title: suggestion,
      date: new Date().toLocaleDateString(),
      from: {
        uid: localStorage.getItem("user"),
        nick: user.nick,
      },
    }).then(() => {
      toast.success("List created successfully!");
      dispatch(
        usersSuggestionsListActions.updateUsersSuggestionsList({
          id: id,
          title: suggestion,
          date: new Date().toLocaleDateString(),
          from: {
            uid: localStorage.getItem("user"),
            nick: user.nick,
          },
        })
      );
    });
  };
  return (
    <div className="p-4 w-80 md:w-[35rem] h-[35rem] md:h-[27rem] bg-slate-900 rounded-2xl overflow-hidden">
      <ModalHeader title={`Create List for ${profileUser.nick} ✨`} />
      <div className="flex w-full gap-6 py-2">
        <input
          className="w-full px-2 py-1 bg-transparent border-b outline-none border-slate-300 text-slate-300"
          type="text"
          placeholder="List Name"
          onChange={(e) => setListname(e.target.value)}
          onKeyDown={(e) => handleListener(e)}
        />
        <button
          className="px-4 py-2 transition-all border rounded-lg border-slate-300 hover:border-fuchsia-600 text-slate-300 hover:text-fuchsia-600"
          onClick={handleCreateList}
        >
          Create
        </button>
      </div>
      <Suggestion
        title="List name"
        suggestion1="Should Watch"
        suggestion2="Maybe Later?"
        suggestion3="Definitely Watch!"
        handleSuggestion={handleSuggestion}
      />
      <div className="overflow-scroll h-80 md:h-72 no-scrollbar">
        {usersSuggestionsList &&
          usersSuggestionsList.map((list, i) => (
            <FriendSuggestionCard
              key={list.id}
              listNum={i}
              title={list.title}
              id={list.id}
              list={list.list}
              date={list.date}
              from={list.from}
            />
          ))}
        {usersSuggestionsList.length === 0 && (
          <InfoLabel text="You don't have any suggested lists to this person!" additionalClasses="mt-0" />
        )}
      </div>
    </div>
  );
}

export default CreateFriendList;
