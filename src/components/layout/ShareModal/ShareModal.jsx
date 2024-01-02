import React from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import InfoLabel from "../../common/InfoLabel";

function ShareModal() {
  return (
    <div className="px-8 pt-4 overflow-hidden bg-slate-900 rounded-2xl w-[30rem] h-96">
      <ModalHeader title="Share" />
      <InfoLabel text={"Coming soon..."} />
    </div>
  );
}

export default ShareModal;
