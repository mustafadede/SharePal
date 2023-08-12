import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../store/modalSlice";
import ModalSkeleton from "../../ModalSkeleton/ModalSkeleton";
import MyListModal from "../../MyListModal/MyListModal";
import EmptyCard from "../EmptyCard";
import ListsSectionCard from "./ListsSectionCard";

function ListsSection() {
  const dispatch = useDispatch();
  const { modalState } = useSelector((state) => state.modal);
  const myLists = useSelector((state) => state.myLists.myLists);

  const clickHandler = () => {
    dispatch(modalActions.openModal());
  };

  return (
    <>
      {modalState && (
        <ModalSkeleton>
          <MyListModal />
        </ModalSkeleton>
      )}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
        <motion.div className="flex flex-row flex-wrap justify-start w-full gap-4 p-4 h-fit bg-slate-900 rounded-2xl">
          {myLists.length === 0 && <EmptyCard clickHandler={clickHandler} />}
          {myLists.map((list) => {
            return <ListsSectionCard key={list.id} title={list.title} />;
          })}
        </motion.div>
      </motion.div>
    </>
  );
}

export default ListsSection;
