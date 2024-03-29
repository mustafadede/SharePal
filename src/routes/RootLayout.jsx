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
import ShareModal from "../components/layout/ShareModal/ShareModal";
import FollowerModal from "../components/layout/FollowerModal/FollowerModal";
import FeedCardActionModal from "../components/layout/FeedCardActionModal/FeedCardActionModal";
import SplashModal from "../components/layout/SplashModal/SplashModal";
import SuggestFilmModal from "../components/common/SuggestFılmModal/suggestFilmModal";
import CreateFriendList from "../components/common/CreateFriendList/CreateFriendList";

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
        {modalState && modalName === "shareModal" && (
          <ModalSkeleton>
            <ShareModal />
          </ModalSkeleton>
        )}
        {modalState && modalName === "followerModal" && (
          <ModalSkeleton>
            <FollowerModal />
          </ModalSkeleton>
        )}
        {modalState && modalName === "likesModal" && (
          <ModalSkeleton>
            <FeedCardActionModal />
          </ModalSkeleton>
        )}
        {modalState && modalName === "commentsModal" && (
          <ModalSkeleton>
            <FeedCardActionModal />
          </ModalSkeleton>
        )}
        {modalState && modalName === "splashModal" && (
          <ModalSkeleton>
            <SplashModal />
          </ModalSkeleton>
        )}
        {modalState && modalName === "suggestFilmModal" && (
          <ModalSkeleton>
            <SuggestFilmModal />
          </ModalSkeleton>
        )}
        {modalState && modalName === "createFriendList" && (
          <ModalSkeleton>
            <CreateFriendList />
          </ModalSkeleton>
        )}
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
