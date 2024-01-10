import { ArrowLeftIcon } from "@radix-ui/react-icons";
import React from "react";
import { useNavigate } from "react-router-dom";

function FeedCardPageBackButton() {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/feed");
  };
  return (
    <button className="flex items-center justify-start w-full gap-2 mb-2 group" onClick={clickHandler}>
      <ArrowLeftIcon className="w-5 h-5 duration-150 text-slate-200 group-hover:text-fuchsia-600" />
      <p className="duration-150 text-md text-slate-200 group-hover:text-fuchsia-600">Back</p>
    </button>
  );
}

export default FeedCardPageBackButton;
