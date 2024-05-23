import React from "react";
import CustomButton from "../../common/CustomButton";
import { changedListupdatePinnedList } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";

function ListChangesInfoCard({ data, onChangeHandler }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between w-full h-12">
      <p className="flex items-center justify-start w-1/3 h-full text-white rounded-2xl">Change applies ?</p>
      <CustomButton
        title="Yes"
        customClasses="ml-4"
        onClickHandler={() => {
          changedListupdatePinnedList(data).then((val) => {
            if (val) {
              onChangeHandler(false);
              dispatch(modalActions.updateDragable(false));
              toast.success("List updated successfully.");
              dispatch;
            } else {
              toast.error("Failed to update list.");
            }
          });
        }}
      />
    </div>
  );
}

export default ListChangesInfoCard;
