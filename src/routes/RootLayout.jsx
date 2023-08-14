import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import MyListModal from "../components/layout/MyListModal/MyListModal";
import ModalSkeleton from "../components/layout/ModalSkeleton/ModalSkeleton";
import AttachedFilmModal from "../components/layout/AttachedFilmModal/AttachedFilmModal";
import SearchCardModal from "../components/layout/SearchPage/SearchCardModal";

function RootLayout() {
  const { modalState, modalName } = useSelector((state) => state.modal);
  return (
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
      <Outlet />;
    </div>
  );
}

export default RootLayout;
