import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import MyListModal from "../components/layout/MyListModal/MyListModal";
import ModalSkeleton from "../components/layout/ModalSkeleton/ModalSkeleton";
import AttachedFilmModal from "../components/layout/AttachedFilmModal/AttachedFilmModal";
import SearchCardModal from "../components/layout/SearchPage/SearchCardModal";
import ListModal from "../components/layout/MyListModal/ListModal/ListModal";
import ShareModal from "../components/layout/ShareModal/ShareModal";
import FollowerModal from "../components/layout/FollowerModal/FollowerModal";
import FeedCardActionModal from "../components/layout/FeedCardActionModal/FeedCardActionModal";
import SuggestFilmModal from "../components/common/SuggestFılmModal/suggestFilmModal";
import CreateFriendList from "../components/common/CreateFriendList/CreateFriendList";
import WatchedThisModal from "../components/common/watchedThis/WatchedThisModal";
import SearchModal from "../components/common/SearchModal/SearchModal";
import PersonModal from "../components/layout/SearchPage/PersonModal";

const contextClass = {
  success:
    "border border-emerald-500/20 bg-emerald-950/90 text-emerald-50 backdrop-blur-lg",
  error:
    "border border-red-500/20 bg-red-950/90 text-red-50 backdrop-blur-lg",
  info:
    "border border-blue-500/20 bg-blue-950/90 text-blue-50 backdrop-blur-lg",
  warning:
    "border border-yellow-500/20 bg-yellow-950/90 text-yellow-50 backdrop-blur-lg",
  default:
    "border border-white/10 bg-slate-900/90 text-white backdrop-blur-lg",
  dark:
    "border border-white/10 bg-slate-900/90 text-white backdrop-blur-lg",
};

function RootLayout() {
  const { modalState, modalName } = useSelector((state) => state.modal);
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;
  return (
    <>
      {/* {!localStorage.getItem("isClosed") && !isClosed && (
        <LabelInfo info={t("info.contact")} data="mustafadededev@gmail.com" handleClose={handleClose} />
      )} */}
      <div className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8">
        <ToastContainer
          toastClassName={(context) =>
            `${contextClass[context?.type || "default"]}
            relative flex min-h-16 w-full
            items-center justify-between
            rounded-lg px-4 py-3
            shadow-xl mb-2
            cursor-pointer
            overflow-hidden`
          }
          closeButton={false}
          position={isMobile ? "top-right" : "bottom-right"}
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop
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
        {/* {modalState && modalName === "commentsModal" && (
          <ModalSkeleton>
            <FeedCardActionModal />
          </ModalSkeleton>
        )} */}
        {modalState && modalName === "watchedThisModal" && (
          <ModalSkeleton>
            <WatchedThisModal />
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
        {modalState && modalName === "searchModal" && (
          <ModalSkeleton>
            <SearchModal />
          </ModalSkeleton>
        )}
        {modalState && modalName === "personModal" && (
          <ModalSkeleton>
            <PersonModal />
          </ModalSkeleton>
        )}
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
