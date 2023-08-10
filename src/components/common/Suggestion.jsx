import React from "react";
import { useDispatch } from "react-redux";
import { MyListsActions } from "../../store/myListsSlice";

function Suggestion({ title, suggestion1, suggestion2, suggestion3 }) {
  const dispatch = useDispatch();
  const handleCreateList = (suggestion) => {
    if (suggestion) {
      dispatch(
        MyListsActions.setMyLists({
          id: Math.random().toString(36).substr(2, 9),
          title: suggestion,
          isPinned: false,
        })
      );
    }
  };
  return (
    <>
      {/** Suggestion section start */}
      <div className="flex gap-2 pt-2 pb-4">
        <p className="text-md text-slate-300">{title} suggestion:</p>
        <button
          className="underline transition-all rounded-lg hover:border-fuchsia-600 text-slate-300 hover:text-fuchsia-600"
          onClick={() => handleCreateList(suggestion1)}
        >
          {suggestion1}
        </button>
        <button
          className="underline transition-all rounded-lg hover:border-fuchsia-600 text-slate-300 hover:text-fuchsia-600"
          onClick={() => handleCreateList(suggestion2)}
        >
          {suggestion2}
        </button>
        <button
          className="underline transition-all rounded-lg hover:border-fuchsia-600 text-slate-300 hover:text-fuchsia-600"
          onClick={() => handleCreateList(suggestion3)}
        >
          {suggestion3}
        </button>
      </div>
      {/** Suggestion section end */}
    </>
  );
}

export default Suggestion;
