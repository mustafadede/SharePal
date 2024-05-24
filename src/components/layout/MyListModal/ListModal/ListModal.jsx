import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalHeader from "../../ModalSkeleton/ModalHeader";
import ListModalCard from "./ListModalCard";
import { Reorder, m, motion } from "framer-motion";
import ListChangesInfoCard from "../ListChangesInfoCard";
import { useTranslation } from "react-i18next";

function ListModal() {
  const { t } = useTranslation();
  const { modalHasData, dragable, orderDirection } = useSelector((state) => state.modal);
  const [search, setSearch] = useState("");
  const [list, setList] = useState(modalHasData.list && Object.values(modalHasData.list));
  const [listChanged, setListChanged] = useState(false);

  const handleOrder = (values) => {
    setListChanged(true);
    setList(values);
  };

  useEffect(() => {
    setList(list?.reverse());
  }, [orderDirection]);

  return (
    <div className="bg-slate-900 rounded-2xl px-8 pt-4 w-[25rem] md:w-[35rem] h-fit">
      <ModalHeader options={true} username={modalHasData.username} />
      <div className="flex flex-col justify-center w-full py-2">
        <div className="flex flex-col justify-between md:flex-row"></div>
        <input
          type="text"
          className="w-full py-2 mb-4 text-lg text-white transition-all bg-transparent border-b-2 outline-none lg:text-2xl focus-within:border-slate-900"
          placeholder={t("search.title")}
          onChange={(e) => setSearch(e.target.value)}
        />
        {listChanged && <ListChangesInfoCard data={list} onChangeHandler={setListChanged} />}
        {dragable && (
          <motion.p
            className="text-lg text-slate-600"
            initial={{ opacity: 0, height: "0%" }}
            animate={{ opacity: 1, height: "27px" }}
            exit={{ opacity: 0, height: "0%" }}
            transition={{ duration: 0.5 }}
          >
            {t("list.dragInfo")}
          </motion.p>
        )}
        <div className="pb-4 overflow-scroll h-[18rem] lg:h-72 no-scrollbar">
          {!modalHasData.list && <p className="text-xl text-slate-600">{t("list.empty")}</p>}
          {dragable ? (
            <Reorder.Group values={list} onReorder={handleOrder}>
              {list &&
                !search &&
                list?.map((item, index) => {
                  return (
                    <Reorder.Item key={index} value={item}>
                      <ListModalCard
                        key={index}
                        id={Object.keys(modalHasData.list)[index]}
                        itemId={item?.id}
                        title={item.title}
                        poster={item.poster}
                        releaseDate={item.releaseDate}
                        backdrop={item.backdrop}
                        mediaType={item.mediaType}
                        username={modalHasData.username}
                        listNumber={index + 1}
                      />
                    </Reorder.Item>
                  );
                })}
            </Reorder.Group>
          ) : (
            list &&
            !search &&
            list?.map((item, index) => {
              return (
                <ListModalCard
                  key={index}
                  id={Object.keys(modalHasData.list)[index]}
                  itemId={item?.id}
                  title={item.title}
                  poster={item.poster}
                  releaseDate={item.releaseDate}
                  backdrop={item.backdrop}
                  mediaType={item.mediaType}
                  username={modalHasData.username}
                  listNumber={index + 1}
                />
              );
            })
          )}
          {search &&
            Object.values(modalHasData.list)
              ?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
              .map((item, index) => {
                const searchedIndex = Object.values(modalHasData.list).indexOf(item);
                return (
                  <ListModalCard
                    key={index}
                    id={modalHasData?.from ? item.id : Object.keys(modalHasData.list)[index]}
                    title={item.title}
                    poster={item.poster}
                    releaseDate={item.releaseDate}
                    backdrop={item.backdrop}
                    username={modalHasData.username}
                    listNumber={searchedIndex + 1}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default ListModal;
