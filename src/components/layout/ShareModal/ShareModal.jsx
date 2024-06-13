import React, { useCallback, useRef } from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { useTranslation } from "react-i18next";
import CardViewSection from "./CardViewSection/CardViewSection";
import ShareButtons from "./ShareButton/ShareButtons";
import { toPng } from "html-to-image";

function ShareModal() {
  const { t } = useTranslation();
  const ref = useRef(null);

  const downloadScreenshot = useCallback(() => {
    if (ref.current === null) return;

    toPng(ref.current, { cacheBust: true }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "feed-card.png";
      link.href = dataUrl;
      link.click();
    });
  }, [ref]);

  return (
    <div className="px-8 pt-4 overflow-hidden overflow-y-auto no-scrollbar bg-slate-900 rounded-2xl w-[30rem] lg:w-[45rem] h-fit">
      <ModalHeader title={t("feedCard.share")} />
      <div className="flex flex-col mt-2">
        <CardViewSection referance={ref} />
        <ShareButtons downloadHandler={downloadScreenshot} />
      </div>
    </div>
  );
}

export default ShareModal;
