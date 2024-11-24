import { CopyIcon, DownloadIcon } from "@radix-ui/react-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ShareButtons({ downloadHandler }) {
  const { modalHasData } = useSelector((state) => state.modal);
  const { i18n, t } = useTranslation();
  const handleCopy = () => {
    navigator.clipboard.writeText(`https://sharepal.dev/#/feed/${modalHasData.nick}/${modalHasData.postId}`);
    if (i18n.language === "en") {
      toast.success("Copied to clipboard");
    } else {
      toast.success("Panoya kopyalandı");
    }
  };

  return (
    <div className="flex gap-2">
      <button
        className="flex items-center justify-center w-full h-12 gap-2 my-4 text-sm font-semibold duration-150 rounded-lg text-fuchsia-600 hover:text-slate-400 bg-slate-800"
        onClick={downloadHandler}
      >
        <DownloadIcon className="w-5 h-5" />
        {t("share.download")}
      </button>
      <button
        className="flex items-center justify-center w-full h-12 gap-2 my-4 text-sm font-semibold duration-150 rounded-lg text-fuchsia-600 hover:text-slate-400 bg-slate-800"
        onClick={handleCopy}
      >
        <CopyIcon className="w-5 h-5" />
        {t("share.clipboard")}
      </button>
    </div>
  );
}

export default ShareButtons;
