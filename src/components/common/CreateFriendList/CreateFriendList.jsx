import React, { useEffect, useState } from "react";
import ModalHeader from "../../layout/ModalSkeleton/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import Suggestion from "../Suggestion";
import { toast } from "react-toastify";
import { createNotification, createUserSuggestionLists, getSelectedUserSuggestionLists } from "../../../firebase/firebaseActions";
import { usersSuggestionsListActions } from "../../../store/UsersSuggestionsListSlice";
import FriendSuggestionCard from "../../FriendSuggestiionCard";
import InfoLabel from "../InfoLabel";
import { useTranslation } from "react-i18next";

function CreateFriendList() {
  const { t, i18n } = useTranslation();
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
        userId: profileUser.uid,
      }).then(() => {
        i18n.language === "en" ? toast.success("List created successfully!") : toast.success("Liste başarıyla oluşturuldu!");
        dispatch(
          usersSuggestionsListActions.updateUsersSuggestionsList({
            id: id,
            title: listname,
            date: new Date().toLocaleDateString(),
            from: {
              uid: localStorage.getItem("user"),
              nick: user.nick,
            },
            userId: profileUser.uid,
          })
        );
        createNotification(profileUser.uid, {
          id: id,
          title: listname,
          date: new Date().toLocaleDateString(),
          from: {
            uid: localStorage.getItem("user"),
            nick: user.nick,
          },
          type: "list",
          userId: profileUser.uid,
        });
      });
    } else {
      i18n.language === "en" ? toast.error("List name cannot be empty.") : toast.error("Liste adı boş olamaz.");
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
      userId: profileUser.uid,
    }).then(() => {
      i18n.language === "en" ? toast.success("List created successfully!") : toast.success("Liste başarıyla oluşturuldu!");
      dispatch(
        usersSuggestionsListActions.updateUsersSuggestionsList({
          id: id,
          title: suggestion,
          date: new Date().toLocaleDateString(),
          from: {
            uid: localStorage.getItem("user"),
            nick: user.nick,
          },
          userId: profileUser.uid,
        })
      );
      createNotification(profileUser.uid, {
        id: id,
        title: listname,
        date: new Date().toLocaleDateString(),
        from: {
          uid: localStorage.getItem("user"),
          photo: user.photoURL,
          nick: user.nick,
        },
        type: "list",
        userId: profileUser.uid,
      });
    });
  };

  return (
    <div className="p-4 w-80 md:w-[35rem] h-[35rem] md:h-[27rem] bg-slate-900 rounded-2xl overflow-hidden">
      <ModalHeader title={`Create List for ${profileUser.nick} ✨`} />
      <div className="flex w-full gap-6 py-2">
        <input
          className="w-full px-2 py-1 bg-transparent border-b outline-none border-slate-300 text-slate-300"
          type="text"
          placeholder={t("friendList.suggestion")}
          onChange={(e) => setListname(e.target.value)}
          onKeyDown={(e) => handleListener(e)}
        />
        <button
          className="px-4 py-2 transition-all border rounded-lg border-slate-300 hover:border-fuchsia-600 text-slate-300 hover:text-fuchsia-600"
          onClick={handleCreateList}
        >
          {t("friendList.create")}
        </button>
      </div>
      <Suggestion
        title={t("friendList.suggestion")}
        suggestion1={t("friendList.suggestion1")}
        suggestion2={t("friendList.suggestion2")}
        suggestion3={t("friendList.suggestion3")}
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
              date={list.date}
              from={list.from}
              nodeId={list.nodeId}
            />
          ))}
        {usersSuggestionsList.length === 0 && <InfoLabel text={t("friendList.noList")} additionalClasses="mt-0" />}
      </div>
    </div>
  );
}

export default CreateFriendList;
