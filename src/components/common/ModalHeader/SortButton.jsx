import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { modalActions } from "../../../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import HoverInfo from "../HoverInfo";
import { useTranslation } from "react-i18next";

function SortButton() {
  const { t } = useTranslation();
  const { orderDirection } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <button
      className="relative flex items-center justify-center p-1 rounded-lg cursor-pointer group bg-slate-600"
      onClick={() => dispatch(modalActions.updateOrderDirection(!orderDirection))}
    >
      {orderDirection ? (
        <ArrowDownIcon className="flex items-center justify-center w-6 h-6 text-slate-200" />
      ) : (
        <ArrowUpIcon className="flex items-center justify-center w-6 h-6 text-slate-200" />
      )}
      <HoverInfo title={t("list.sortTitle")} />
    </button>
  );
}

export default SortButton;
