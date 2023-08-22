import React from "react";
import { useSelector } from "react-redux";
import ModalHeader from "../../ModalSkeleton/ModalHeader";

function ListModal() {
  const { modalHasData } = useSelector((state) => state.modal);
  return (
    <div className="bg-slate-900 rounded-2xl px-8 pt-4 overflow-hidden w-[36rem] h-[30rem]">
      <ModalHeader title={modalHasData.title} />
      <div className="flex flex-col justify-center w-full py-2">
        <p className="text-lg text-slate-500 ">Creation Time: {modalHasData.date}</p>
        {modalHasData.list.length === 0 && <p className="py-4 text-xl text-slate-600">Your list is empty.</p>}
      </div>
    </div>
  );
}

export default ListModal;
