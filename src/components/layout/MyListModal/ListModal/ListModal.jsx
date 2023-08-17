import React from "react";
import { useSelector } from "react-redux";
import ModalHeader from "../../ModalSkeleton/ModalHeader";

function ListModal() {
  const { modalHasData } = useSelector((state) => state.modal);
  return (
    <div className="bg-slate-900 rounded-2xl px-8 pt-4 overflow-hidden w-96 h-[30rem]">
      <ModalHeader title={modalHasData.title} />
      <div className="flex flex-col justify-center py-4 pt-4">
        <p className="text-xl text-slate-300">List Modal</p>
      </div>
    </div>
  );
}

export default ListModal;
