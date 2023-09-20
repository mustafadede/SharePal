import React from "react";
import { useSelector } from "react-redux";
import ModalHeader from "../../ModalSkeleton/ModalHeader";
import ListModalCard from "./ListModalCard";

function ListModal() {
  const { modalHasData } = useSelector((state) => state.modal);
  return (
    <div className="bg-slate-900 rounded-2xl px-8 pt-4 overflow-hidden w-[25rem] md:w-[35rem] h-[28rem] md:h-[25rem]">
      <ModalHeader title={modalHasData.title} />
      <div className="flex flex-col justify-center w-full py-2">
        <div className="flex flex-col justify-between md:flex-row">
          <p className="text-lg text-slate-500 ">Creation Time: {modalHasData.date}</p>
          <p className="text-lg text-slate-500 ">Total Items: {modalHasData.list?.length}</p>
        </div>
        <div className="pb-4 overflow-scroll h-80 no-scrollbar">
          {modalHasData.list?.length === 0 && <p className="py-4 text-xl text-slate-600">Your list is empty.</p>}
          {modalHasData.list.length > 0 &&
            modalHasData.list.map((item, index) => (
              <ListModalCard key={index} title={item.title} poster={item.poster} releaseDate={item.releaseDate} backdrop={item.backdrop} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ListModal;
