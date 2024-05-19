import React from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { CopyIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
function ShareModal() {
  const { t, i18n } = useTranslation();
  const { modalHasData } = useSelector((state) => state.modal);
  const handleCopy = () => {
    navigator.clipboard.writeText(`https://sharepal.dev/#/feed/${modalHasData.nick}/${modalHasData.postId}`);
    if (i18n.language === "en") {
      toast.success("Copied to clipboard");
    } else {
      toast.success("Panoya kopyalandı");
    }
  };

  return (
    <div className="px-8 pt-4 overflow-hidden bg-slate-900 rounded-2xl w-[30rem] h-96">
      <ModalHeader title={t("feedCard.share")} />
      <button
        className="flex items-center justify-center w-full h-12 mt-4 text-sm font-semibold duration-150 rounded-lg text-fuchsia-600 hover:text-slate-400 bg-slate-800"
        onClick={handleCopy}
      >
        <CopyIcon className="w-5 h-5 mr-2" />
        {t("share.clipboard")}
      </button>
    </div>
  );
}

export default ShareModal;
