import React from "react";
import CustomButton from "../../common/CustomButton";
import { changedListupdatePinnedList } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";

function ListChangesInfoCard({ data, onChangeHandler }) {
  console.log(data);
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
              toast.success("List updated successfully.");
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
