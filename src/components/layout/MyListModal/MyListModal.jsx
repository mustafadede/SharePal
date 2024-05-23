import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MyListsActions } from "../../../store/myListsSlice";
import { getSelectedUserLists, getSelectedUserSuggestionLists } from "../../../firebase/firebaseActions";
import MyListModalHeader from "./MyListModalHeader/MyListModalHeader";
import MyListsSection from "./MyListsSection";
import { useTranslation } from "react-i18next";
import FriendsLists from "./FriendsLists";
import { SuggestedListActions } from "../../../store/suggestedList";

function MyListModal() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const { t } = useTranslation();
  useEffect(() => {
    const getUserLists = async () => {
      const res = await getSelectedUserLists(localStorage.getItem("user"));
      dispatch(MyListsActions.initilizeList(res));
      const suggestionList = await getSelectedUserSuggestionLists(localStorage.getItem("user"));
      dispatch(SuggestedListActions.setSuggestedList(suggestionList));
    };
    getUserLists();
  }, []);

  return (
    <div className="bg-slate-900 rounded-2xl px-4 md:px-8 pt-4 overflow-hidden w-[24rem] md:w-[35rem] h-[35rem] md:h-[27rem]">
      <MyListModalHeader tabInfo={tab} tab={setTab} />
      {tab === 0 ? <MyListsSection /> : <FriendsLists />}
    </div>
  );
}

export default MyListModal;
