import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalHeader from "../../ModalSkeleton/ModalHeader";
import ListModalCard from "./ListModalCard";

function ListModal() {
  const { modalHasData } = useSelector((state) => state.modal);
  const [search, setSearch] = useState("");
  const [findIndexForSearchItem, setFindIndexForSearchItem] = useState(null);
  useState(() => {
    if (!modalHasData.username) {
      setFindIndexForSearchItem(
        Object.values(modalHasData.list)?.findIndex((item) => item.title.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }, [modalHasData.username === null]);

  return (
    <div className="bg-slate-900 rounded-2xl px-8 pt-4 overflow-hidden w-[25rem] md:w-[35rem] h-[28rem] md:h-[30rem]">
      <ModalHeader title={modalHasData.title} />
      <div className="flex flex-col justify-center w-full py-2">
        <div className="flex flex-col justify-between md:flex-row">
          <p className="text-lg text-slate-500 ">Creation Time: {modalHasData.date}</p>
          <p className="text-lg text-slate-500 ">Total Items: {modalHasData.list ? Object.keys(modalHasData.list)?.length : 0}</p>
        </div>
        <input
          type="text"
          className="w-full py-2 mb-4 text-lg text-white transition-all bg-transparent border-b-2 outline-none lg:text-2xl focus-within:border-slate-900"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="pb-4 overflow-scroll h-[18rem] lg:h-80 no-scrollbar">
          {!modalHasData.list && <p className="py-4 text-xl text-slate-600">Your list is empty.</p>}
          {modalHasData.list &&
            !search &&
            Object.values(modalHasData.list)?.map((item, index) => {
              return (
                <ListModalCard
                  key={index}
                  id={Object.keys(modalHasData.list)[index]}
                  listId={modalHasData.id}
                  findIndex={null}
                  title={item.title}
                  poster={item.poster}
                  releaseDate={item.releaseDate}
                  backdrop={item.backdrop}
                  username={modalHasData.username}
                />
              );
            })}
          {search &&
            Object.values(modalHasData.list)
              ?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
              .map((item, index) => {
                return (
                  <ListModalCard
                    key={index}
                    id={Object.keys(modalHasData.list)[findIndexForSearchItem]}
                    listId={modalHasData.id}
                    findIndex={findIndexForSearchItem}
                    title={item.title}
                    poster={item.poster}
                    releaseDate={item.releaseDate}
                    backdrop={item.backdrop}
                    username={modalHasData.username}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default ListModal;
