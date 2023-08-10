import React from "react";
import { createPortal } from "react-dom";

function Modal() {
  const portalElement = document.getElementById("modal");

  const ModalBox = (props) => {
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">{props.children}</div>
    </div>;
  };

  return <>{createPortal(<ModalBox>{props.children}</ModalBox>, portalElement)}</>;
}

export default Modal;
