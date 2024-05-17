import { useEffect, useState } from "react";
import PopularItem from "./PopularItem";
import { useDispatch } from "react-redux";
import ShowMore from "./ShowMore";
import useFetchPopular from "../../../hooks/useFetchPopular";
import { useTranslation } from "react-i18next";
function PopularCard() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    useFetchPopular(setData);
  }, []);
  return (
    <div className="flex flex-col p-6 lg:w-56 xl:w-72 h-fit bg-slate-900 rounded-2xl">
      <p className="text-2xl text-slate-200">{t("popular.title")}</p>
      {data.map((value, index) => {
        return <PopularItem key={index} data={value} dispatch={dispatch} />;
      })}
      <ShowMore />
    </div>
  );
}

export default PopularCard;
