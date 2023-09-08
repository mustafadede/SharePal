import React from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { useSelector } from "react-redux";

function FollowerModal() {
  const { modalHasData } = useSelector((state) => state.modal);
  return (
    <div className="px-8 pt-4 overflow-hidden bg-slate-900 rounded-2xl w-[30rem] h-96">
      <ModalHeader title={modalHasData.followType} />
      <h1 className="text-xl text-slate-200">Coming Soon...</h1>
    </div>
  );
}

export default FollowerModal;
