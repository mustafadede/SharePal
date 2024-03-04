import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalHeader from "../../ModalSkeleton/ModalHeader";
import ListModalCard from "./ListModalCard";
import { Reorder, motion } from "framer-motion";
import ListChangesInfoCard from "../ListChangesInfoCard";

function ListModal() {
  const { modalHasData, dragable } = useSelector((state) => state.modal);
  const [search, setSearch] = useState("");
  const [list, setList] = useState(Object.values(modalHasData.list));
  const [listChanged, setListChanged] = useState(false);

  const handleOrder = (values) => {
    setListChanged(true);
    setList(values);
  };

  return (
    <div className="bg-slate-900 rounded-2xl px-8 pt-4 overflow-hidden w-[25rem] md:w-[35rem] h-[28rem] md:h-[30rem]">
      <ModalHeader options={true} username={modalHasData.username} />
      <div className="flex flex-col justify-center w-full py-2">
        <div className="flex flex-col justify-between md:flex-row"></div>
        <input
          type="text"
          className="w-full py-2 mb-4 text-lg text-white transition-all bg-transparent border-b-2 outline-none lg:text-2xl focus-within:border-slate-900"
          placeholder="Search..."
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
            Drag and drop to reorder.
          </motion.p>
        )}
        <div className="pb-4 overflow-scroll h-[18rem] lg:h-80 no-scrollbar">
          {!modalHasData.list && <p className="py-4 text-xl text-slate-600">Your list is empty.</p>}
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
                        listId={modalHasData.listNum}
                        findIndex={null}
                        title={item.title}
                        poster={item.poster}
                        releaseDate={item.releaseDate}
                        backdrop={item.backdrop}
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
                  listId={modalHasData.listNum}
                  findIndex={null}
                  title={item.title}
                  poster={item.poster}
                  releaseDate={item.releaseDate}
                  backdrop={item.backdrop}
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
                    id={Object.keys(modalHasData.list)[searchedIndex]}
                    listId={modalHasData.listNum}
                    findIndex={searchedIndex}
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
