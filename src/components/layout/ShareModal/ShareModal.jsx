import React from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { useTranslation } from "react-i18next";
import CardViewSection from "./CardViewSection/CardViewSection";
import ShareButtons from "./ShareButton/ShareButtons";
import { createFileName } from "use-react-screenshot";
import html2canvas from "html2canvas";

function ShareModal() {
  const { t } = useTranslation();
  const ref = React.createRef();
  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => {
    html2canvas(ref.current, { logging: true, letterRendering: 1, allowTaint: false, useCORS: true }).then((canvas) => {
      const image = canvas.toDataURL("image/jpeg", 1.0);
      download(image);
    });
  };
  return (
    <div className="px-8 pt-4 overflow-hidden overflow-y-auto no-scrollbar bg-slate-900 rounded-2xl w-[25rem] md:w-[45rem] h-fit">
      <ModalHeader title={t("feedCard.share")} />
      <div className="flex flex-col mt-2">
        <CardViewSection referance={ref} />
        <ShareButtons referance={ref} downloadHandler={downloadScreenshot} />
      </div>
    </div>
  );
}

export default ShareModal;
