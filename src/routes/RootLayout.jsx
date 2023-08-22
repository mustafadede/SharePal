import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import MyListModal from "../components/layout/MyListModal/MyListModal";
import ModalSkeleton from "../components/layout/ModalSkeleton/ModalSkeleton";
import AttachedFilmModal from "../components/layout/AttachedFilmModal/AttachedFilmModal";
import SearchCardModal from "../components/layout/SearchPage/SearchCardModal";
import ListModal from "../components/layout/MyListModal/ListModal/ListModal";
import LabelInfo from "../components/layout/LabelInfo";

function RootLayout() {
  const { modalState, modalName } = useSelector((state) => state.modal);
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
    localStorage.setItem("isClosed", true);
  };
  return (
    <>
      {!localStorage.getItem("isClosed") && !isClosed && (
        <LabelInfo
          info="This site is currently under development. If you see any buggedy buggedy bug bug, please contact"
          data="mustafadededev@gmail.com"
          handleClose={handleClose}
        />
      )}
      <div className="container mx-auto">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {modalState && modalName === "pinnedModal" && (
          <ModalSkeleton>
            <MyListModal />
          </ModalSkeleton>
        )}
        {modalState && modalName === "attachedFilmModal" && (
          <ModalSkeleton>
            <AttachedFilmModal />
          </ModalSkeleton>
        )}
        {modalState && modalName === "searchCardModal" && (
          <ModalSkeleton>
            <SearchCardModal />
          </ModalSkeleton>
        )}
        {modalState && modalName === "listModal" && (
          <ModalSkeleton>
            <ListModal />
          </ModalSkeleton>
        )}
        <Outlet />;
      </div>
    </>
  );
}

export default RootLayout;
